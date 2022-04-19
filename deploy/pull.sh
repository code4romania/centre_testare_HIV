set -e

cd /root/centre_testare_HIV
git reset --hard HEAD
git pull

ENVIRONMENT=staging docker-compose up -d --build --force-recreate --remove-orphans db redis api
