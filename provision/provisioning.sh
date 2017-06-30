#!/bin/sh

FB_SDK_ZIPFILE=facebook-ios-sdk-current.zip

if [ ! -d ~/Documents/FacebookSDK ]; then
  mkdir -p ~/Documents/FacebookSDK
fi

rm -f ./${FB_SDK_ZIPFILE}

curl https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip > ./${FB_SDK_ZIPFILE}

unzip -u ./${FB_SDK_ZIPFILE} -d ~/Documents/FacebookSDK

exit 0
