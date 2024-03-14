# Configuration

You can easly configure highscore using environnement variables. 
These are all current variables you can update to configure your highscore instance like you want.

[[toc]]

## Global

| Variable          | Description       | Type           | Default         |
| ----------------  | ----------------- | -------------- | --------------- |
| `HIGHSCORE_PORT`  |  Define port of the app | number   | 8081            |
| `HIGHSCORE_DB_URL`|  Define mongodb url     | string   | |
| `HIGHSCORE_SESSION_SECRET`| Secret used for the `express-session` | string | |


## Customization

These options allow you to customize the default website.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_TITLE` | Home page title | string | HighScore |
| `HIGHSCORE_DESCRIPTION`| Home page description | string | Open Source leaderboard |
| `HIGHSCORE_LOGO_URL`| Home page logo url | string | /logo.png |
| `HIGHSCORE_FAVICON_URL`| Home page favicon url | string | /favicon.ico |
| `HIGHSCORE_CSS_URL`| Home page custom css url | string | |

:::tip
Go to the [customization](/guide/customization) section to get more information about this.
:::

## Download

These options configure the redirect for the `/download` endpoint depending on the user platform.
If you haven't configured a platform it will use the `HIGHSCORE_DOWNLOAD_URL` fallback url.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_DOWNLOAD_URL` | Default download link | string |  |
| `HIGHSCORE_WINDOWS_DOWNLOAD_URL`| Windows download link | string |  |
| `HIGHSCORE_LINUX_DOWNLOAD_URL`| Linux download link | string |  |
| `HIGHSCORE_MACOS_DOWNLOAD_URL`| Macos download link | string |  |
| `HIGHSCORE_ANDROID_DOWNLOAD_URL`| Android download link | string | |
| `HIGHSCORE_IOS_DOWNLOAD_URL`| iOS download link | string | |

## Docs (swagger)

These options allow you to configure the `/docs` endpoint.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_USERNAME_DOCS` | Username for basic auth of `/docs`. | string | |
| `HIGHSCORE_PASSWORD_DOCS` | Password for basic auth of `/docs`. | string | |
| `HIGHSCORE_DISABLE_DOCS` | Disable the `/docs` endpoint | boolean | false |

## Metrics

These options allow you to configure the `/metrics` endpoint.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_USERNAME_METRICS` | Username for basic auth of `/metrics`. | string  | |
| `HIGHSCORE_PASSWORD_METRICS` | Password for basic auth of `/metrics`. | string  | |
| `HIGHSCORE_DISABLE_METRICS` | Disable the `/metrics` endpoint | boolean | false |

## Bad words

This option allow you to configure the bad words filter.
If you want add more filter to the bad words list update the `config/ban.json` file.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_DISABLE_BAD_WORDS` | Disable the bad words filter | boolean  | false |

## Rate limit

This option add a request rate limit to each endpoint of the application.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_RATE_LIMIT_MINUTE` | Define the time for the rate limit in minute | number  | 60 |
| `HIGHSCORE_RATE_LIMIT_NUMBER` | Number of request limit | number  | 1000 |
| `HIGHSCORE_DISABLE_RATE_LIMIT` | Disable the rate limit | boolean  | false |

## Privacy policy

This option allow you to configure the privacy page with your own information.

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_PRIVACY_EMAIL` | Your email address for the privacy policy | string  |  |
| `HIGHSCORE_PRIVACY_WEBSITE` | Your website address for the privacy policy | string  |  |
| `HIGHSCORE_PRIVACY_COUNTRY` | Your country | string  |  |