/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

#import <InbeaconSdk/InbeaconSdk.h>
#import "AppDelegate+CDVInBeacon.h"
#import <objc/runtime.h>

@implementation AppDelegate (CDVInBeacon)


+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        Class class = [self class];
		
		// http://nshipster.com/method-swizzling/
        SEL originalSelector = @selector(application:didFinishLaunchingWithOptions:);
        SEL swizzledSelector = @selector(xxx_application:didFinishLaunchingWithOptions:);
        
        Method originalMethod = class_getInstanceMethod(class, originalSelector);
        Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
        
        BOOL didAddMethod = class_addMethod(class, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
        
        if (didAddMethod) {
            class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
        } else {
            method_exchangeImplementations(originalMethod, swizzledMethod);
        }
		
 	    // localnotification
        SEL selectorForNotification = @selector(application:didReceiveLocalNotification:);
        SEL swizzledSelectorForNotification = @selector(xxx_application:didReceiveLocalNotification:);
        
        Method methodForNotification = class_getInstanceMethod(class, selectorForNotification);
        Method swizzledMethodForNotification = class_getInstanceMethod(class, swizzledSelectorForNotification);
        
        BOOL didAddMethodForNotification = class_addMethod(class, selectorForNotification, method_getImplementation(swizzledMethodForNotification), method_getTypeEncoding(swizzledMethodForNotification));
        
        if (didAddMethodForNotification) {
            class_replaceMethod(class, swizzledSelectorForNotification, method_getImplementation(methodForNotification), method_getTypeEncoding(methodForNotification));
        } else {
            method_exchangeImplementations(methodForNotification, swizzledMethodForNotification);
        }
		
		// usernotification
        SEL selectorForUserNotification = @selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
        SEL swizzledSelectorForUserNotification = @selector(xxx_userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:);
        
        Method methodForUserNotification = class_getInstanceMethod(class, selectorForUserNotification);
        Method swizzledMethodForUserNotification = class_getInstanceMethod(class, swizzledSelectorForUserNotification);
        
        BOOL didAddMethodForUserNotification = class_addMethod(class, selectorForUserNotification, method_getImplementation(swizzledMethodForUserNotification), method_getTypeEncoding(swizzledMethodForUserNotification));
        
        if (didAddMethodForUserNotification) {
            class_replaceMethod(class, swizzledSelectorForUserNotification, method_getImplementation(methodForUserNotification), method_getTypeEncoding(methodForUserNotification));
        } else {
            method_exchangeImplementations(methodForUserNotification, swizzledMethodForUserNotification);
        }
		
		// usernotificationwillpresent
        SEL selectorForUserNotificationWillPresent = @selector(userNotificationCenter:willPresentNotification:withCompletionHandler:);
        SEL swizzledSelectorForUserNotificationWillPresent = @selector(xxx_userNotificationCenter:willPresentNotification:withCompletionHandler:);
        
        Method methodForUserNotificationWillPresent = class_getInstanceMethod(class, selectorForUserNotificationWillPresent);
        Method swizzledMethodForUserNotificationWillPresent = class_getInstanceMethod(class, swizzledSelectorForUserNotificationWillPresent);
        
        BOOL didAddMethodForUserNotificationWillPresent = class_addMethod(class, selectorForUserNotificationWillPresent, method_getImplementation(swizzledMethodForUserNotificationWillPresent), method_getTypeEncoding(swizzledMethodForUserNotificationWillPresent));
        
        if (didAddMethodForUserNotificationWillPresent) {
            class_replaceMethod(class, swizzledSelectorForUserNotificationWillPresent, method_getImplementation(methodForUserNotificationWillPresent), method_getTypeEncoding(methodForUserNotificationWillPresent));
        } else {
            method_exchangeImplementations(methodForUserNotificationWillPresent, swizzledMethodForUserNotificationWillPresent);
        }    
        
    });
}

- (BOOL) xxx_application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

	InbeaconSdk.sharedInstance.logLevel =InbLogLevelError;  // 
    
    NSString *clientId = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"inBeacon API clientId"];
    NSString *secret = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"inBeacon API secret"];
    
    if (clientId != nil && secret != nil) {
		[InbeaconSdk createWithClientID: clientId andClientSecret: secret]; 
    }
	else {
		NSLog(@"INBEACON SDK NOT INITIALIZED: CLIENTID AND/OR CLIENTSECRET NOT DEFINED");
	}
	// this is NOT an infinite loop! (see swizzle logic)
    return [self xxx_application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void) xxx_application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    [[InbeaconSdk getInstance] didReceiveLocalNotification:notification];   // make sure local notifications pass through the inbeacon SDK
	// this is NOT an infinite loop! (see swizzle logic)
	//[self xxx_application:application didReceiveLocalNotification: notification];
}

- (void)xxx_userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler {
         
    if (![[InbeaconSdk getInstance] didReceiveUserNotification: response.notification]) {
		// this is NOT an infinite loop! (see swizzle logic)
		//[self xxx_userNotificationCenter:center didReceiveNotificationResponse: response withCompletionHandler:completionHandler ]; 
		return;  	
    }
	completionHandler();
}

- (void)xxx_userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
         
    completionHandler( UNNotificationPresentationOptionSound | 
						UNNotificationPresentationOptionBadge | 
						UNNotificationPresentationOptionAlert );
}
    
@end
