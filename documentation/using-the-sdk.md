
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

### cordova.plugins.inBeacon.beaconState

```javascript
cordova.plugins.inBeacon.beaconState()
```

Get an array of all actual beacons within view, including their respective distance and proximity state. This method returns raw data without any filtering.

The returned beaconState array has 1 entry for each beacon in view. Each array item has the following data: 

<table>
  <tr>
    <td>Field</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>uuid</td>
    <td>beacon UUID value</td>
  </tr>
  <tr>
    <td>major</td>
    <td>beacon major value</td>
  </tr>
  <tr>
    <td>minor</td>
    <td>beacon minor value</td>
  </tr>
  <tr>
    <td>proxes</td>
    <td>Timestamps of all proximities last seen, format: <proximity>: <time last seen>
Proximities are F, N and I.</td>
  </tr>
  <tr>
    <td>rawdist</td>
    <td>raw beacon distance in metres</td>
  </tr>
  <tr>
    <td>rawprox</td>
    <td>raw proximity (F, N, I or U) U = undefined, beacon currently not visible</td>
  </tr>
</table>


Because beacon information is updated once per second, it is not useful to obtain the beaconstate more often.

## Receiving inBeaconSDK events 

<table>
  <tr>
    <td>Event</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>inbeacon.enterregion</td>
    <td>user entered a region</td>
  </tr>
  <tr>
    <td>inbeacon.exitregion</td>
    <td>user left a region</td>
  </tr>
  <tr>
    <td>inbeacon.enterlocation</td>
    <td>user entered a location</td>
  </tr>
  <tr>
    <td>inbeacon.exitlocation</td>
    <td>user left a location</td>
  </tr>
  <tr>
    <td>inbeacon.regionsupdate</td>
    <td>region definitions were updated</td>
  </tr>
  <tr>
    <td>inbeacon.enterproximity</td>
    <td>user entered a beacon proximity</td>
  </tr>
  <tr>
    <td>inbeacon.exitproximity</td>
    <td>user left a beacon proximity</td>
  </tr>
  <tr>
    <td>inbeacon.proximity</td>
    <td>low level proximity update, once every second when beacons are around</td>
  </tr>
  <tr>
    <td>inbeacon.appevent</td>
    <td>defined in the backend for application events</td>
  </tr>
  <tr>
    <td>inbeacon.appaction</td>
    <td>defined in the backend to handle your own local notifications</td>
  </tr>
</table>


Example:

```javascript
document.addEventListener('inbeacon.enterregion', handleEnterRegion, false);function handleEnterRegion(event){    console.log('Event name:' + event.name);    console.log('Event data:' + JSON.stringify(event.data));}
```

