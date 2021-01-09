#!/bin/bash -eu

npm run generate && \
find dist/ -type f | grep -v '.gz' | grep -v '.br' | xargs -I "{}" brotli -f -k -Z -v "{}" && \
find dist/ -type f | grep -v '.gz' | grep -v '.br' | xargs -I "{}" gzip -f -k -9 -v "{}"
