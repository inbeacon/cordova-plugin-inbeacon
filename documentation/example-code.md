

# Implementation example

Please refer to the cordova developers site to create a new cordova project. 

Consquently add the inbeacon plugin like so:

```bash
cordova plugin add https://github.com/inbeacon/cordova-plugin-inbeacon.git 
   --variable INBEACON_CLIENTID="your-clientid" 
   --variable INBEACON_SECRET="your-secret"
```

Note the need to include the clientId and the clientSecret as parameters

There is also a [complete example project available](https://github.com/inbeacon/inbeacon-cordova-example)

## Standard application

For the inBeacon SDK you need to get the user's permission to get the location and scan for beacons (iOS, android M and up). The SDK provides a helper method for this, but sometimes you want to roll your own.
The simplest way is to call the helper method on onDeviceReady (in your www/js/index.js):
```javascript
    onDeviceReady: function() {
		...
        cordova.plugins.inBeacon.askPermissions(function () {}, function (error) {});
    },
```
but you might postpone this question to a more appropriate moment.

## Testing the application with beacons
Go to the inbeacon backend and create a region, a location and a beacon to set up your beacon infrastructure. Now create a campaign with a beacon trigger, a notification action and a textview. 

Reload your app to make sure it refreshes, and you should be able to get beacon interactions in your app with this campaign. 