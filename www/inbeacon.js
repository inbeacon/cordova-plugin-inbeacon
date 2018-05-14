/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var cordova = require('cordova'),
    exec    = require('cordova/exec');

/**
 * @constructor
 */
function InBeacon() {

    //create new document events
    this.channels = {
        enterregion: cordova.addDocumentEventHandler('inbeacon.enterregion'),
        exitregion : cordova.addDocumentEventHandler('inbeacon.exitregion'),
        enterlocation : cordova.addDocumentEventHandler('inbeacon.enterlocation'),
        exitlocation : cordova.addDocumentEventHandler('inbeacon.exitlocation'),
        regionsupdate : cordova.addDocumentEventHandler('inbeacon.regionsupdate'),
        enterproximity : cordova.addDocumentEventHandler('inbeacon.enterproximity'),
        exitproximity : cordova.addDocumentEventHandler('inbeacon.exitproximity'),
        proximity : cordova.addDocumentEventHandler('inbeacon.proximity'),
        appevent : cordova.addDocumentEventHandler('inbeacon.appevent'),
        appaction : cordova.addDocumentEventHandler('inbeacon.appaction')
    };

    for (var key in this.channels) {
        this.channels[key].onHasSubscribersChange = InBeacon.onHasSubscribersChange;
    }
}

function handlers(){
    var sum = 0;
    for(var key in inBeacon.channels){
        sum += inBeacon.channels[key].numHandlers;
    }
    return sum;
}

/**
 * Event handlers for when callbacks get registered for InBeacon.
 * Keep track of how many handlers we have so we can start and stop the native listener
 * appropriately (and hopefully save on battery life!).
 */
InBeacon.onHasSubscribersChange = function() {
    // If we just registered the first handler, make sure native listener is started.
    if (this.numHandlers === 1 && handlers() === 1) {
        exec(inBeacon._listener, inBeacon._listenerError, "InBeacon", "startListener", []);
    } else if (handlers() === 0) {
        exec(null, null, "InBeacon", "stopListener", []);
    }
};

InBeacon.prototype._listener = function (data) {
    if (data && data.name) {
        cordova.fireDocumentEvent('inbeacon.'+data.name, data || {});
    }
};

InBeacon.prototype._listenerError = function(){
    console.log("Failed to initialize InBeacon event listener");
}

/**
 * Loglevel 0  = no logging
 * @type {number}
 */
InBeacon.LOG_NONE     = 0;
/**
 * Loglevel 1  = errors only
 * @type {number}
 */
InBeacon.LOG_ERROR    = 1;
/**
 * Loglevel 2  = important logs and errors
 * @type {number}
 */
InBeacon.LOG_LOG      = 2;
/**
 * Loglevel 3  = more verbose
 * @type {number}
 */
InBeacon.LOG_INFO     = 3;
/**
 * Loglevel 4  = even more verbose
 * @type {number}
 */
InBeacon.LOG_DEBUG    = 4;


/**
 * To initialize connection with inBeacon API using ClientId and Secret
 *
 * @param {object} kwargs Keyword arguments is an object contain key/value pairs of clientId and secret
 * @param {Function} successCallback The function to call when succeeded
 * @param {Function} errorCallback The function to call when there is an error (OPTIONAL)
 */
InBeacon.prototype.initialize = function(kwargs, successCallback, errorCallback) {
    exec(successCallback, errorCallback || null, "InBeacon", "initialize", [kwargs]);
};

/**
 * To get the newest data from inBeacon API
 *
 * @param {Function} successCallback The function to call when succeeded
 * @param {Function} errorCallback The function to call when there is an error (OPTIONAL)
 */
InBeacon.prototype.refresh = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "refresh", []);
}

/**
 * To change the logging level, using one of the predefined constants
 *
 * @param int logLevel 0 - 4 (none error log info debug)
 * @param {Function} successCallback The function to call when succeeded
 * @param {Function} errorCallback The function to call when there is an error (OPTIONAL)
 */
InBeacon.prototype.setLogLevel = function(logLevel, successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "setLogLevel", [logLevel]);
};

/**
 * Attach local userinformation to inbeacon (legacy)
 *
 * @param userInfo
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.attachUser = function(userInfo, successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "attachUser", [userInfo]);
};

/**
 * put User properties (2.0)
 *
 * @param userInfo
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.putProperties = function(userInfo, successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "putProperties", [userInfo]);
};

/**
 * get User property (2.0)
 *
 * @param userInfo
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.getProperty = function(key, successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "getProperty", [key]);
};

/**
 * get PPID
 *
 * @param userInfo
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.getPPID = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "getPPID", []);
};

/**
 * set PPID
 *
 * @param userInfo
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.setPPID = function(ppid,successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "setPPID", [ppid]);
};


/**
 * trigger a custom event
 *
 * @param eventId (long)
 * @param eventType (ONESHOT, IN, OUT)
 * @param extra
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.triggerCustomEvent = function(eventId, eventType, extra, successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "triggerCustomEvent", [eventId, eventType, extra]);
};

/**
 * Logout the current user. From now only anonymous info is send to inBeacon server. (OBSOLETE)
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.detachUser = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "detachUser", []);
};

/**
 * Check to see if the app has the rights to run location and notification services.
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.checkCapabilitiesAndRights = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "checkCapabilitiesAndRights", []);
};

/**
 * iOS only! Checks capabilities and rights and calls an alert if something is not OK.
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.checkCapabilitiesAndRightsWithAlert = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "checkCapabilitiesAndRightsWithAlert", []);
};

/**
 * iOS only! Get an array of all current defined location objects (regions).
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.getInRegions = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "getInRegions", []);
};

/**
 * iOS only! Get an array of all actual beacons within view, including their respective distance and proximity state.
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.getBeaconState = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "getBeaconState", []);
};

/**
 * Android only! Convenience method to ask COARSE_LOCATION permissions for SDSK 23,
 * needed for the use of beacons
 * (Safe to call with SDK22 and lower, in this case it does nothing)
 *
 * @param successCallback
 * @param errorCallback
 */
InBeacon.prototype.askPermissions = function(successCallback, errorCallback){
    exec(successCallback, errorCallback || null, "InBeacon", "askPermissions", []);
};

var inBeacon = new InBeacon();

module.exports.inBeacon = inBeacon;
module.exports.InBeacon = InBeacon;

