#!/usr/bin/env bash

workon tc_venv
sudo nginx -c `pwd`/nginx/nginx.conf -p "`pwd`"
uwsgi --ini uwsgi_conf.ini &
