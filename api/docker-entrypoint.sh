#!/bin/bash

API_PORT=${API_PORT:-"8050"}

RUN_MIGRATION=${RUN_MIGRATION:-"yes"}
RUN_COMPILEMESSAGES=${RUN_COMPILEMESSAGES:-"yes"}
RUN_COLLECT_STATIC=${RUN_COLLECT_STATIC:-"yes"}
RUN_LOAD_DUMMY_DATA=${RUN_LOAD_DUMMY_DATA:-"no"}
RUN_DEV_SERVER=${RUN_DEV_SERVER:-"no"}

echo "Run basic health checks"
./manage.py check

if [[ ${RUN_MIGRATION} = "yes" ]] ; then
  echo "Run database migrations"
  ./manage.py migrate
fi

if [[ ${RUN_COMPILEMESSAGES} = "yes" ]] ; then
  echo "Compile i18n messages"
  ./manage.py compilemessages
fi

if [[ ${ENVIRONMENT} != "production" && ${RUN_LOAD_DUMMY_DATA} = "yes" ]] ; then
  echo "Load dummy data in the database"
  ./manage.py loaddata statistics
  ./manage.py loaddata pages
fi

if [[ ${RUN_COLLECT_STATIC} = "yes" ]] ; then
  echo "Collect static files (this will take a while)"
  ./manage.py collectstatic --no-input
fi

if [[ ${ENVIRONMENT} != "production" && ${RUN_DEV_SERVER} = "yes" ]] ; then
  echo "Start web server on ${API_PORT}"
  ./manage.py runserver_plus "0.0.0.0:${API_PORT}"
else
   gunicorn testing_centers_site.wsgi --bind "0.0.0.0:${GUNICORN_PORT}" --log-level info -k gevent -w "${GUNICORN_WORKERS}" --timeout 300
fi
