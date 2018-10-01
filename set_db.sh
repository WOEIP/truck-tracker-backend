#!/usr/bin/env
PGPASSWORD=$(echo $PGPASSWORD) psql --host localhost --user postgres --dbname postgres --command "CREATE DATABASE truck_tracker_dev;"
