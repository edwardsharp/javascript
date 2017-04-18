#!/bin/sh

cd /home/pi/mic_ws
#sudo python -m SimpleHTTPServer 80 &
sudo python simple-https-server.py & 
npm start
