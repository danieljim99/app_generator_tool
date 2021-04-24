#!/bin/sh -xe
if [ -d /root/config/ ]; then
    cp /root/config/env /usr/src/backend/.env
fi

deno run --allow-read --allow-net index.ts
