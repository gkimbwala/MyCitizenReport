# MyCitizenReport

######Phonegap tutorial (slightly outdated)
http://docs.phonegap.com/en/edge/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide

######What I (David) did

The command to install phonegap via NPM (I used the Homebrew package manager to install NodeJS on my Macbook. NodeJS has its own package manager NPM):

* brew install nodejs
* npm install phonegap

The commands that created the phone app project (if anyone needs to redo it):

* phonegap create mycitizenreport-app
* cd mycitizenreport-app
* phonegap platform add ios

To test the app in Xcode, you open up the .xcodeproj file in the platforms/ios directory. You can then click the "play" button or the "run" command to run it in the iOS simulator. To make changes, you can edit the html/css/js files in the www folder in Xcode. Before the changes can take effect, though, you have to run phonegap's "prepare" command in the terminal. There might be a better way to do all this, but this is what worked in our quick tests before dinner:

* phonegap prepare ios