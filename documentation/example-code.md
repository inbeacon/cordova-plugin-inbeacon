

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

Just add the plugin and you're good to go.

## Testing the application with beacons
Go to the inbeacon backend and create a region, a location and a beacon to set up your beacon infrastructure. Now create a campaign with a beacon trigger, a notification action and a textview. 

Reload your app to make sure it refreshes, and you should be able to get beacon interactions in your app with this campaign. 