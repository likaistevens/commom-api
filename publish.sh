#!/bin/bash
#. /etc/profile

set -e

echo "NODE_ENV=production\nBUILD_PATH='./dist'" > .env
cat ../pwd.conf >> .env

yarn

tsc

pm2 stop api || true
pm2 start node ./dist/api.js

