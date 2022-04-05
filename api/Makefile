help:                             ## Display a help message detailing commands and their purpose
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""

## [UTILS]
requirements-build:               ## run pip compile and add requirements from the *.in files
	pip-compile -o requirements.txt requirements.in && pip-compile -o requirements-dev.txt requirements-dev.in

requirements-update:              ## run pip compile and rebuild the requirements files
	pip-compile -r -U -o requirements.txt requirements.in && pip-compile -r -U -o requirements-dev.txt requirements-dev.in && chmod a+r requirements.txt && chmod a+r requirements-dev.txt

## [DB TOOLS]
migrations:                       ## generate migrations in a clean container
	./manage.py makemigrations

migrate:                          ## apply migrations in a clean container
	./manage.py migrate

## [LOCALES]
makemessages:                     ## generate the strings marked for translation
	./manage.py makemessages -a

compilemessages:                  ## compile the translations
	./manage.py compilemessages

collectstatic:                    ## collect static files
	./manage.py collectstatic --no-input

## [CODE CHECKING]
format:                           ## format the code
	black --line-length=120 --target-version=py39  --exclude migrations ./

format-check:                     ## check the code is formatted
	black --line-length=120 --target-version=py39 --check --diff  --exclude migrations ./
