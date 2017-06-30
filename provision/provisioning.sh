#!/bin/sh

if [ ! -d ~/Documents/FacebookSDK ]; then
  mkdir -p ~/Documents/FacebookSDK
fi

rm -f ./FacebookSDKs-iOS*.zip

wget https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip

unzip -u ./FacebookSDKs-iOS-*.zip -d ~/Documents/FacebookSDK

exit 0
