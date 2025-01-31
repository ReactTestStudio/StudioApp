#!/bin/bash

BOOTED_DEVICES=$(xcrun simctl list devices booted | grep "Booted")

if [[ -z "$BOOTED_DEVICES" ]]; then
    echo "None runing, starting one"
    
    
    DEVICE_ID=$(xcrun simctl list devices | grep -m 1 "(Shutdown)" |   sed -E 's/.*\(([A-F0-9\-]+)\) \(Shutdown\)/\1/')
    
    if [[ -n "$DEVICE_ID" ]]; then
        xcrun simctl boot $DEVICE_ID
        echo "Device ID $DEVICE_ID Booted"
    else
        echo "None able to boot."
    fi
else
    echo "There is one booted."
fi