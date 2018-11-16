from wsgiref.simple_server import make_server
from flask import Flask
from bottle import Bottle

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b'test wsgi']

app = Bottle()

@app.route('/')
def test():
    return 'test bottle'

httpd = make_server('127.0.0.1', 8000, app)
print('serving HTTP on port 8000...')
httpd.serve_forever()