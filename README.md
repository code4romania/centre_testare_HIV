# HIV Testing Centers

[![GitHub contributors][ico-contributors]][link-contributors]
[![GitHub last commit][ico-last-commit]][link-last-commit]
[![License: MPL 2.0][ico-license]][link-license]

The application helps users more easily locate health centers in Romania where they can get tested for HIV.

[Contributing](#contributing) | [Built with](#built-with) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code for Romania](#about-code-for-romania)

## Contributing

This project is built by amazing volunteers, and you can be one of them! Here's a list of ways in [which you can contribute to this project][link-contributing]. If you want to make any change to this repository, please **make a fork first**.

Help us out by testing this project in the [staging environment][link-staging]. If you see something that doesn't quite work the way you expect it to, open an Issue. Make sure to describe what you _expect to happen_ and _what is actually happening_ in detail.

If you would like to suggest new functionality, open an Issue and mark it as a __[Feature request]__. Please be specific about why you think this functionality will be of use. If you can, please include some visual description of what you would like the UI to look like, if you are suggesting new UI elements.

## Built With

### Programming languages

[Python 3.9](https://www.python.org)

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Frontend framework

[React](https://reactjs.org/)

### Backend framework

[Django 3.2 LTS](https://www.djangoproject.com)

### Package managers

**Frontend:** [NPM](https://www.npmjs.com/)

**Backend:** [pip](https://pip.pypa.io/)

### Database technology & provider

[PostgreSQL 14](https://www.postgresql.org/docs/14/index.html)

## Deployment

Guide users through getting your code up and running on their own system. In this section you can talk about:
1. Make a copy of the `.env` file, change the variables and run the build command

    ```shell
    cp .env.dev .env
    # modify the variables in the .env and then build the development container
    make build-dev
    ```

2. Software dependencies

    You can run the app through docker, if it is installed on your machine. If you wish to run it manually you will need to have `gettext` installed.

    All these dependencies can be easily installed on a Mac or Ubuntu system by running `make install-docker-ubuntu` or `make install-docker-macos`.

### Environment variables

The `.env` files contain variables required to start the services and initialize them.

- `ENVIRONMENT` - [`test`|`development`|`staging`|`production`] sets the type of deployment (default `production`)
- `RUN_MIGRATION` - [`yes`|`no`] run django migrations when you start the app (default `yes`)
- `RUN_COMPILEMESSAGES` - [`yes`|`no`] compile i18n messages when you first start the app (default `yes`)
- `RUN_LOAD_DUMMY_DATA` - [`yes`|`no`] load the data from the `fixtures/` folders (default `no`)
- `RUN_COLLECT_STATIC` - [`yes`|`no`] collects static data like images/fonts (default `yes` - has no effect if `ENVIRONMENT != production`)
- `RUN_DEV_SERVER` - [`yes`|`no`] starts the app in development mode with a more comprehensive debugging toolbox (default `no`)
- `DATABASE_URL` - the URL Django will use to connect to the database (should be changed if you're not running through Docker)
- `REACT_APP_CAPTCHA_API_KEY` - you can either [use a test key](https://docs.hcaptcha.com/#integration-testing-test-keys) or get a real key by [creating an hCAPTCHA account](https://dashboard.hcaptcha.com/signup) and then [getting your key from your settings page](https://dashboard.hcaptcha.com/settings); then you create a **New Site** and copy the **Site Key**
- `HERE_MAPS_API_KEY` & `REACT_APP_HERE_MAPS_API_KEY` - can be the same key, find out how to get it from [the HERE Maps developer tutorial](https://developer.here.com/tutorials/getting-here-credentials/)

## Feedback

* Request a new feature on GitHub.
* Vote for popular feature requests.
* File a bug in GitHub Issues.
* Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code for Romania

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of around 2.000 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, IT security and more) who work pro bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site][link-code4] or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here][link-donate].


[ico-contributors]: https://img.shields.io/github/contributors/code4romania/centre_testare_HIV.svg?style=for-the-badge
[ico-last-commit]: https://img.shields.io/github/last-commit/code4romania/centre_testare_HIV.svg?style=for-the-badge
[ico-license]: https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge

[link-contributors]: https://github.com/code4romania/centre_testare_HIV/graphs/contributors
[link-last-commit]: https://github.com/code4romania/centre_testare_HIV/commits/develop
[link-license]: https://opensource.org/licenses/MPL-2.0
[link-contributing]: https://github.com/code4romania/.github/blob/main/CONTRIBUTING.md

[link-code4]: https://code4.ro/en/
[link-donate]: https://code4.ro/en/donate/
