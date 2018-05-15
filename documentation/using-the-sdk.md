
# SDK methods

* askPermissions
* putProperties
* getProperty
* hasTag
* setTag
* resetTag
* getPPID
* setPPID
* checkCapabilitiesAndRights
* triggerCustomEvent
* setLogLevel 
* refresh

Legacy and obsolete methods
* attachUser
* detachUser


iOS only methods
* checkCapabilitiesAndRightsWithAlert (iOS only)
* getInRegions (iOS only)
* getBeaconState (iOS only)

### cordova.plugins.inBeacon.askPermissions

```javascript
cordova.plugins.inBeacon.askPermissions(function () {}, function (error) {});
```

For the inBeacon SDK you need to get the user's permission to get the location and scan for beacons (iOS, android M and up). The SDK provides a helper method for this, but sometimes you want to roll your own.
The simplest way is to call the helper method on onDeviceReady:
```javascript
    onDeviceReady: function() {
		...
        cordova.plugins.inBeacon.askPermissions(function () {
			// success
		}, function (error) {
			// error
		});
    },
```
but you might postpone this question to a more appropriate moment.
	
### cordova.plugins.inBeacon.putProperties
### cordova.plugins.inBeacon.attachUser (legacy)

Note:*attachUser is a legacy method and is now superseeded by putProperties. The usage of both methods is the same*

```javascript
cordova.plugins.inBeacon.attachUser(userInfo,function cb(){});
cordova.plugins.inBeacon.putProperties(userInfo, function cb(){});
```
The inBeacon backend retains user information for each device. The user information consists of any number of properties that fall in any of the 3 categories:

* Fixed properties. These always exist and control specific functionality. These are the fixed properties
  - `name`: Full user name, both first and family name. Example ‘Dwight Schulz’
  - `email`: User email. Example: ‘dwight@a-team.com’
  - `gender`: User gender: male, female or unknown
  - `country`: ISO3166 country code
  - `id`: inBeacon unique user id (read-only)
  - `avatar`: URL to user avatar

* Custom properties. You can define other properties, like "facebook-ID" or "my-ID". Properties can be string or numeric,

* Tags. Users can be tagged, a tag us a string that can be set or reset.

User properties are **persistent** on the device, and also **automatically synchronized with the backend** and thus will **survive an app re-install** (on both iOS and Android)

Replication with the backend works both ways: Local updates are send to the server, server updates are send to the app. Because the device initiates the communication, updates from server to device do not occur immediately but will have to wait until the device starts the next communication cycle.

> Note: Properties cannot be removed once created. Tags can be reset, which removes the tag.


```javascript
var userInfo = {
	name  : 'Dwight Schultz',
	email : 'dwight@ateam.com',
	height: 177.67,
	age:  56
};
cordova.plugins.inBeacon.putProperties(userInfo, function () {
    app.log('Succesfully put properties: '+userInfo);
}, function () {
    app.error('Failed to put properties');
});
```



### cordova.plugins.inBeacon.getProperty

```javascript
cordova.plugins.inBeacon.getProperty(<key>, function cb(){} );
```
Get a user property. see putProperties.

```
cordova.plugins.inBeacon.getProperty('name', function (value) {
    app.log('Succesfully got property name:'+value);
}, function () {
    app.error('Failed');
});
```

### cordova.plugins.inBeacon.hasTag
### cordova.plugins.inBeacon.setTag
### cordova.plugins.inBeacon.resetTag

Tags are a special type of userproperty that have a name and can be set or reset. Tags are reset by default.

```javascript
        cordova.plugins.inBeacon.hasTag('myTag',function(has) {
			if (has) ...
        },function(error){});
		
		cordova.plugins.inBeacon.setTag('myTag',function() {
			// tag is now set
	    },function(error){});	
		
		cordova.plugins.inBeacon.resetTag('myTag',function() {
			// tag is now reset
	    },function(error){});
````


### cordova.plugins.inBeacon.getPPID
### cordova.plugins.inBeacon.setPPID

An alternative for the IDFA is to roll your own Publisher Provided ID. If you use Doubleclick For Publishers (DFP), a PPID might be a better option than using an IDFA. 
A PPID is a ID that is attached to the App on a Device that can be used for retargeting or identifing the app install on the device. (each app has a different PPID if installed on the same device)

In addition to your own PPID's, the SDK will generate a unique ID, based on the device and app bundle. This can function as a PPID if you do not want to create your own. 
This PPID will survive app re-installs. The PPID provided by the SDK will be a hashed (base64) value.

See [Google DFP documentation on PPID's](https://support.google.com/dfp_premium/answer/2880055?hl=en)

The PPID is available as a read/write property of the SDK instance:

```javascript
        cordova.plugins.inBeacon.getPPID(function(ppid) {
                console.log('PPID = '+ppid);
        },function (error) {});
		
        cordova.plugins.inBeacon.setPPID('your ppid', function() {
               // PPID is now set to the specified value
        },function (error) {});
```		

### cordova.plugins.inBeacon.triggerCustomEvent

```javascript
cordova.plugins.inBeacon.triggerCustomEvent(eventID, eventType, extra, function cb(){} );
```

The SDK supports custom events that can be used for (examples)

* custom spot types that generate events just like beacons or geofences
* other types of events, for instance certain user actions inside the app

Different event-types are supported:

- eventtype **ONESHOT**. For unrelated events, a oneshot event is not connected to other events, and no time-spend is calculated.
- eventtype **IN** and **OUT**. For in/out eventtypes, a time-spend is calculated for example to measure dwell times. Also the in and out events are connected and kept for "currently in" and "currently not in" status calculation based on the eventID. A device can be inside more than one eventID at the same time.

Custom events can be used in the campaign designer and are stored as touchpoints and can be used in touchpoint analysis.

A custom event has 3 properties:

- an ID. The eventID should be defined in the inbeacon backend, otherwise triggering it will be ignored.
- an eventType, which can be IN, OUT or ONESHOT. (see com.inbeacon.sdk.Custom.EventType)
- (optional) extra data. This is a string with extra data for custom purposes to give more context.

>Example: 
```javascript
cordova.plugins.inBeacon.triggerCustomEvent(44, 'ONESHOT', "some info", function () {
    app.log('Success');
}, function () {
    app.error('Failed');
});
```


### cordova.plugins.inBeacon.checkCapabilitiesAndRights

Check to see if the app has the rights to run location and notification services. Returns BOOL NO if there is a problem.

```javascript
cordova.plugins.inBeacon.checkCapabilitiesAndRights()
```

### cordova.plugins.inBeacon.setLogLevel

In order to get more logging, the loglevel might be increased. 
Possible values:
* cordova.plugins.inBeacon.LOG_NONE 
* cordova.plugins.inBeacon.LOG_ERROR 
* cordova.plugins.inBeacon.LOG_LOG 
* cordova.plugins.inBeacon.LOG_INFO    
* cordova.plugins.inBeacon.LOG_DEBUG    

```javascript
cordova.plugins.inBeacon.setLogLevel(cordova.plugins.inBeacon.LOG_DEBUG);
```

### cordova.plugins.inBeacon.refresh

```javascript
cordova.plugins.inBeacon.refresh();
```

Obtain fresh information from the inBeacon server. 
As of version 2 of the plugin, refresh is done automatically, and you do not need to call it.


## Receiving inBeaconSDK events 

<table>
  <tr>
    <td>Event</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>inbeacon.appevent</td>
    <td>defined in the backend for application events</td>
  </tr>
</table>


To handle an InBeacon event just add a new event listener.

```
document.addEventListener('inbeacon.appevent', handleAppEvent, false);

function handleAppEVent(event){
    console.log('Event name:' + event.name);
    console.log('Event data:' + JSON.stringify(event.data));
}
```


