
# SDK methods

* refresh
* attachUser
* detachUser
* checkCapabilitiesAndRights
* setLogLevel (iOS only)
* checkCapabilitiesAndRightsWithAlert (iOS only)
* getInRegions (iOS only)
* getBeaconState (iOS only)
* checkCapabilitiesAndRights (android only)

### cordova.plugins.inBeacon.refresh

```javascript
cordova.plugins.inBeacon.refresh();
```

Obtain fresh trigger and region information from the inBeacon platform. Best practice is to call this when the app is 

* started AND

* returned to the foreground so info is kept updated.  Internally, the SDK automatically refreshes when a beacon area is entered. 

* Additionally it is imported to note that data will only be transfered when something has changed in the configuration. Otherwise the device is told it is up to date.

	

### cordova.plugins.inBeacon.attachUser

```javascript
cordova.plugins.inBeacon.attachUser(userInfo,function cb(){});
```

Attach local userinformation to inbeacon. For instance, the user might enter account information in the app. It is also possible not to attach a user, in that case the device is anonymous. 

Note:*  User account information is not stored by the SDK so you’ll need to call attachUser every time the app starts (after SDK initialization)*

The inBeacon backend has user information for each device. The user information are properties that fall in any of the 2 categories:

* Fixed properties. These always exist and control specific functionality. These are the fixed properties
  - `name`: Full user name, both first and family name. Example ‘Dwight Schulz’
  - `email`: User email. Example: ‘dwight@a-team.com’
  - `gender`: User gender: male, female or unknown
  - `country`: ISO3166 country code
  - `id`: inBeacon unique user id (read-only)
  - `avatar`: URL to user avatar

* Custom properties. You can define other properties, like "facebook-ID" or “age”


```javascript
var userInfo = {    name  : 'Dwight Schultz',    email : 'dwight@ateam.com'};cordova.plugins.inBeacon.attachUser(userInfo, function () {        console.log('Succesfully attached user');    }, function () {        console.error('Failed to attach user');    });
```

>Note that attached user info is not stored by the SDK. On app restart, you need to attach the user again.*

	

### cordova.plugins.inBeacon.detachUser

Remove user properties connected to the device.

```javascript
cordova.plugins.inBeacon.detachUser();
```

### cordova.plugins.inBeacon.checkCapabilitiesAndRights

Check to see if the app has the rights to run location and notification services. Returns BOOL NO if there is a problem.

```javascript
cordova.plugins.inBeacon.checkCapabilitiesAndRights()
```


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

