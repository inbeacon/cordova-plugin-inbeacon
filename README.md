![image alt text](documentation/image_0.png)


## Cordova inBeacon plugin

This plugin enables the InBeacon API for Cordova based apps on iOS and Android.

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

## Minimal application

For the most simple implementation, in index.js just do a refresh in onDeviceReady of your app object, like this:

```
onDeviceReady: function() {
	app.receivedEvent('deviceready');
	cordova.plugins.inBeacon.refresh(function(){
		console.log('refresh done!');
	}, function () {
		console.error('refresh failed');
	});
},
```

## Features

#### Features available on both Android and iOS

##### API calls

 * refresh
 * attachUser
 * detachUser
 * checkCapabilitiesAndRights

##### API events

 * inbeacon.appevent

#### Features exclusive to iOS

##### API calls

 * setLogLevel
 * checkCapabilitiesAndRightsWithAlert

#### Feature exclusive to Android

##### API call

 * askPermissions

#### initialize

The sdk is automatically initialized when the plugin is installed with the correct client-id and client-secret.

#### refresh

```
cordova.plugins.inBeacon.refresh(function(){
        console.log('refresh done!');
    }, function () {
        console.error('refresh failed');
    });
```

#### attachUser

Attach local userinformation to inbeacon. For instance, the user might enter account information in the app. It is also possible not to attach a user, in that case the device is anonymous.

```
var userInfo = {
    name  : 'Dwight Schultz',
    email : 'dwight@ateam.com'
};
cordova.plugins.inBeacon.attachUser(userInfo, function () {
        console.log('Succesfully attached user');
    }, function () {
        console.error('Failed to attach user');
    });
```

#### events

To handle an InBeacon event just add a new event listener.

```
document.addEventListener('inbeacon.appevent', handleAppEvent, false);

function handleAppEVent(event){
    console.log('Event name:' + event.name);
    console.log('Event data:' + JSON.stringify(event.data));
}
```


