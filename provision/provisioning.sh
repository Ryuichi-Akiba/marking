#!/bin/sh

FB_SDK_ZIPFILE=facebook-ios-sdk-current.zip

echo `pwd`

if [ ! -d ~/Documents/FacebookSDK ]; then
  echo "Directory:~/Documents/FacebookSDK does not exists. make directory..."
  mkdir -p ~/Documents/FacebookSDK
else
  echo "Directory:~/Documents/FacebookSDK already exists."
fi

#if [ ! -e ./FacebookSDKs-iOS-*.zip  ]; then
#  curl https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip > ./${FB_SDK_ZIPFILE}
#  unzip -u ./${FB_SDK_ZIPFILE} -d ~/Documents/FacebookSDK
#else
  unzip -u ./provision/FacebookSDKs-iOS-4.18.0.zip -d ~/Documents/FacebookSDK
#fi

exit 0
