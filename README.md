![image alt text](documentation/image_0.png)


## Cordova inBeacon plugin

This plugin enables the InBeacon API for Cordova based apps on iOS and Android.

## Requirements

For iOS, Only supported with the combination of cordova-ios@4.4.0 and cordova-cli@7.0.0 or higher (swift support needed)

## Documentation

Read the [full documentation](documentation/README.md)

# installing the sdk

These instructions assume you already have an account at[ inBeacon](https://inbeacon.nl/) and are in possession of an Client ID and Client Secret. You can find your client-ID and client-Secret in your [account overview](http://console.inbeacon.nl/accmgr) 

Add the inbeacon plugin to your cordova app with:

```bash
cordova plugin add https://github.com/inbeacon/cordova-plugin-inbeacon.git 
   --variable INBEACON_CLIENTID="your-clientid" 
   --variable INBEACON_SECRET="your-secret"
```

You need to include the clientId and the clientSecret as parameters

## Standard application

For the inBeacon SDK you need to get the user's permission to get the location and scan for beacons. The SDK provides a helper method for this, but sometimes you want to roll your own.
The simplest way is to call the helper method on onDeviceReady:
```javascript
    onDeviceReady: function() {
		...
        cordova.plugins.inBeacon.askPermissions(function () {}, function (error) {});
    },
```


## Testing the application with beacons
Go to the inbeacon backend and create a region, a location and a beacon to set up your beacon infrastructure. Now create a campaign with a beacon trigger, a notification action and a textview. 

Reload your app to make sure it refreshes, and you should be able to get beacon interactions in your app with this campaign. 




