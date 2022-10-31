# Configuration

You can easly configure highscore using environnement variables. 
These are all current variables you can update to configure your highscore instance like you want.

[[toc]]

## Global

| Variable          | Description       | Type           | Default         |
| ----------------  | ----------------- | -------------- | --------------- |
| `HIGHSCORE_PORT`  |  Define port of the app | number   | 8083            |
| `HIGHSCORE_DB_URL`|  Define mongodb url     | string   | |
| `HIGHSCORE_SESSION_SECRET`| Secret used for the `express-session` | string | |


## Customization

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_TITLE` | Home page title | string | HighScore |
| `HIGHSCORE_DESCRIPTION`| Home page description | string | Open Source leaderboard |
| `HIGHSCORE_LOGO_URL`| Home page logo url | string | /logo.png |
| `HIGHSCORE_FAVICON_URL`| Home page favicon url | string | /favicon.ico |
| `HIGHSCORE_CSS_URL`| Home page custom css url | string | |

## Docs (swagger)

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_USERNAME_DOCS` | Username for basic auth of `/docs`. | string | |
| `HIGHSCORE_PASSWORD_DOCS` | Password for basic auth of `/docs`. | string | |
| `HIGHSCORE_DISABLE_DOCS` | Disable the `/docs` endpoint | boolean | false |

## Metrics

| Variable        | Description       | Type           | Default         |
| --------------- | ----------------- | -------------- | --------------- |
| `HIGHSCORE_USERNAME_METRICS` | Username for basic auth of `/metrics`. | string  | |
| `HIGHSCORE_PASSWORD_METRICS` | Password for basic auth of `/metrics`. | string  | |
| `HIGHSCORE_DISABLE_METRICS` | Disable the `/metrics` endpoint | boolean | false |