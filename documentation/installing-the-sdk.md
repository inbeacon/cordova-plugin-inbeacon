# installing the sdk

These instructions assume you already have an account at[ inBeacon](https://inbeacon.nl/) and are in possession of an Client ID and Client Secret. You can find your client-ID and client-Secret in your [account overview](http://console.inbeacon.nl/accmgr) 

Add the inbeacon plugin to your cordova app with:

```bash
cordova plugin add https://github.com/inbeacon/cordova-plugin-inbeacon.git 
   --variable INBEACON_CLIENTID="your-clientid" 
   --variable INBEACON_SECRET="your-secret"
```

You need to include the clientId and the clientSecret as parameters

If you want to install an older version, add #<tag> to the plugin url. Example:
	
```bash
cordova plugin add https://github.com/inbeacon/cordova-plugin-inbeacon.git#1.1.3 
   --variable INBEACON_CLIENTID="your-clientid" 
   --variable INBEACON_SECRET="your-secret"
```


You can also enter the variables in the fetch.json file in the plugins directory later:

```json
        "variables": {
            "INBEACON_CLIENTID": "your client-id",
            "INBEACON_SECRET": "your client-secret"
        }
```

#### initialize

The sdk is automatically initialized when the plugin is installed with the correct client-id and client-secret.