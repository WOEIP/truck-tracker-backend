#!/usr/bin/env bash

rm static/*
cp ../frontend/build/* static/

workon tc_venv
sudo nginx -c `pwd`/nginx/nginx.conf -p "`pwd`"
uwsgi --ini uwsgi_conf.ini &
