#!/bin/bash
cat src/utils.js src/embed.js src/reports.js src/main.js > assets/js/build.js && uglifyjs assets/js/build.js -c -m -o assets/js/build.min.js

