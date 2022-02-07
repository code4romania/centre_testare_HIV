set -e

cd /root/centre_testare_HIV
git reset --hard HEAD
git pull

docker-compose build --build-arg ENVIRONMENT=development db api
docker-compose up -d db api
