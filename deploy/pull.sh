set -e

cd /root/centre_testare_HIV
git reset --hard HEAD
git pull

ENVIRONMENT=development docker-compose up -d --build --force-recreate --remove-orphans db cache redis api
