
# Getting Started

These instructions assume you already have an account at[ inBeacon](https://inbeacon.nl/) and are in possession of an Client ID and Client Secret. You can find your client-ID and client-Secret in your [account overview](https://console.inbeacon.nl/account) 

## iOS details

### Permissions 

When the SDK is integrated, there are a few permissions needed from the user. If the app already needed those permissions before integration of the SDK,, there will be no change (they will not be requested twice). These permissions are requested once after installation when the app is run (and the inBeacon SDK is initialized). 

1. Application would like to send you notifications

	![image alt text](image_1.png)

2. Application would like to access your location even when you are not using the app. 

	![image alt text](image_2.png)
	
4. After running a few days, the user gets a notification that the app is looking for beacons or geofences (even when no beacons or geofences are actually found). We found out that this message is always given in combination with message 2), and is not related to the actual location or iBeacon features used in the app.

	![image alt text](image_4.png)

### Background services

The SDK does not need any of the info plist background modes as defined in the App capabilities.

### Update Info.plist

iOS requires a text that explain why the app should be allowed to use the location services. Add the following keys to the config.xml file and supply a string value with an explanation:

```xml
    <platform name="ios">
		...
        <config-file target="*-Info.plist" parent="NSLocationAlwaysUsageDescription">
            <string>This app would like to get your location even when in the background.</string>
        </config-file>
        <config-file target="*-Info.plist" parent="NSLocationWhenInUseUsageDescription">
            <string>This app would like to get your location, but only when the app is active.</string>
        </config-file>
		<config-file target="*-Info.plist" parent="NSLocationAlwaysAndWhenInUsageDescription">
			<string>This app would like to get your location in the background. Please select background in the list.</string>
		</config-file>
	</platform>
```


### Include audio resources

When using customized sounds with notifications, make sure to copy the audio files from the iOS SDK into your app. To do that, find the **./resources/*.caf** files in the iOS SDK and copy those files to the **./Resources** folder in your iOS project. Next, right-click on the files in Cordova and make sure that 'Build Action' is set to 'BundleResource'. The audio files can also be found in the sample project included in the component.

