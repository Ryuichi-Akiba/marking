#!/bin/sh

if [ ! -d ~/Documents/FacebookSDK ]; then
  mkdir -p ~/Documents/FacebookSDK
fi

unzip -u ./FacebookSDKs-iOS-4.18.0.zip -d ~/Documents/FacebookSDK

exit 0
