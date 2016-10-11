

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
