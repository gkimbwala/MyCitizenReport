/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        //navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
        //app.recordAudio();
    },
    onGeoSuccess: function(position) {
        alert(position.coords.latitude + " " + position.coords.longitude);
    },
    onGeoError: function(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },
    recordAudio: function() {
        app.currentRecording = "documents://" + (new Date().getTime()) + ".wav";
        alert("Recording to " + app.currentRecording);
        var mediaRec = new Media(app.currentRecording, app.onRecordSuccess, app.onRecordError);
        // Record audio
        mediaRec.startRecord();
        setTimeout(function() {
            mediaRec.stopRecord();
            alert("Done recording");
        }, 1000);
    },
    onRecordSuccess: function() {
        alert("recording successful");
        var mediaPlay = new Media(app.currentRecording, function() { alert("Done Playing"); });
        mediaPlay.play();
    },
    onRecordError: function(error) {
        alert("recording failed: " + error.code);
    },
    currentRecording: "",
    
    
};
