#!/bin/sh

cd /home/pi/dmx_ws
sudo python -m SimpleHTTPServer 80 &
npm start

