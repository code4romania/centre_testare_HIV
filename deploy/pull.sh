set -e

cd /root/centre_testare_HIV

git status
git reset --hard HEAD
git checkout main
git pull

ENVIRONMENT=staging docker-compose -f docker-compose.yml up -d --build --force-recreate --remove-orphans db redis api
