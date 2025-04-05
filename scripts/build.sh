#!/bin/bash

# Function to build Android
build_android() {
    echo "Building Android app..."
    cd android
    ./gradlew clean
    ./gradlew assembleRelease
    cd ..
}

# Function to build iOS
build_ios() {
    echo "Building iOS app..."
    cd ios
    pod install
    xcodebuild -workspace UserManagement.xcworkspace \
              -scheme UserManagement \
              -configuration Release \
              -sdk iphoneos \
              -derivedDataPath build
    cd ..
}

# Check platform argument
if [ "$1" == "android" ]; then
    build_android
elif [ "$1" == "ios" ]; then
    build_ios
elif [ "$1" == "all" ]; then
    build_android
    build_ios
else
    echo "Usage: ./build.sh [android|ios|all]"
    exit 1
fi 