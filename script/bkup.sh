#!/bin/bash
comment="-$(echo ${1}|sed 's/ /_/g')"
store="/home/redt1de/make/pendant-backups"
if [ ! -d $store ]; then
    mkdir $store
fi
ts="-$(date +"%m.%d.%y_%H%M")"

if [ -z $1 ]; then
    comment=""
fi

zip -r "${store}/pendant$comment$ts.zip" "/home/redt1de/make/pendant/"