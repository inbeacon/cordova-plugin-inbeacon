
# SDK methods

* putProperties
* getProperty
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
* InBeacon.LOG_NONE 
* InBeacon.LOG_ERROR 
* InBeacon.LOG_LOG 
* InBeacon.LOG_INFO    
* InBeacon.LOG_DEBUG    

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


Example:

```javascript
document.addEventListener('inbeacon.appevent', handleAppEvent, false);function handleAppEvent(event){    console.log('Event name:' + event.name);    console.log('Event data:' + JSON.stringify(event.data));}
```

