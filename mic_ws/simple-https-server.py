# taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# generate server.xml with the following command:
#    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
#    -or-
#    openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 666
#    openssl rsa -in key.pem -out key.pem
# run as follows:
#    python simple-https-server.py
# then in your browser, visit:
#    https://localhost:4443

import BaseHTTPServer, SimpleHTTPServer
import ssl

httpd = BaseHTTPServer.HTTPServer(('mic.local', 443), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, keyfile="ssl/key.pem", certfile='ssl/cert.pem', server_side=True)
httpd.serve_forever()
