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
        var recordButton = document.getElementById('record_incident_button');
        recordButton.addEventListener('click', app.recordAudio, false);
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onGeoError);
    },
        
        // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        app.recordAudio();
    },
    onGeoSuccess: function(position) {
        app.latitude = position.coords.latitude;
        app.longitude = position.coords.longitude;
        
        $("#incident_time").val(new Date());
        $("#incident_location").val(app.latitude + ", " + app.longitude);
    },
    onGeoError: function(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },
    recordAudio: function() {
        var recordButton = document.getElementById('record_incident_button');
        if (!app.currentRecording) {
            recordButton.innerHTML = "Stop";
            app.timestamp = (new Date()).getTime();
            app.recording = true;
            app.currentRecording = new Media("documents://" + app.timestamp + ".wav", app.onRecordSuccess, app.onRecordError);
            app.currentRecording.startRecord();
        }
        else {
            if (app.recording) {
                app.recording = false;
                app.currentRecording.stopRecord();
                recordButton.innerHTML = "Play";
                var submitButton = document.getElementById('submit_incident_button');
                submitButton.style.opacity = 1;
                submitButton.addEventListener('click', app.submitIncident, false);
            }
            else if (app.playing) {
                app.playing = false;
                app.currentRecording.stop();
                recordButton.innerHTML = "Play";
            }
            else {
                app.currentRecording.play();
                app.playing = true;
                recordButton.innerHTML = "Stop";
           }
        }
    },
    onRecordSuccess: function() {
//        alert("recording successful");
    },
    onRecordError: function(error) {
        alert("recording failed: " + error.code);
    },
    submitIncident: function() {
        $.ajax({
            url:        "http://mycitizenreport.com/php/addincident.php",
            method:     "POST",
            data:       {
                            lat:            app.latitude,
                            lng:            app.longitude,
                            description:    $("#incident_description").val(),
                            timestamp:      app.timestamp,
                            user_id:        11,
                            audio:          app.currentRecording.data
                        },
            success:    function(data) {
               alert(data);
           }
        });
    },
    currentRecording: false,
    latitude: false,
    longitude: false,
    timestamp: false,
    recording: false,
    playing: false,
};
