//
//  INBcoso.h
//  inBeaconSdk
//
//  Created by rvw on 4-4-2016.
//  Copyright © 2016 inBeacon. All rights reserved.
//
#import <Foundation/Foundation.h>


#ifndef Hmac_h
#define Hmac_h


@interface Hmac : NSObject

+ (NSString *)hmacsha1:(NSString *)data secret:(NSString *)key;
+ (NSString *)base64ToUrlString: (NSString *) base64;

@end


#endif /* INBcoso_h */
