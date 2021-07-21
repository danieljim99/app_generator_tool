#!/bin/sh -xe
if [ -d /root/config/ ]; then
    cp /root/config/env /usr/src/frontend/.env
fi

aleph dev
