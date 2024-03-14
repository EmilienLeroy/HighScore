# Download

The `/download` endpoint allows you to redirect users to the appropriate version of your game based on their device. To configure this, you need to update the environment variables.

[[toc]]

## Fallback download link

To set up a fallback download option, you must update the `HIGHSCORE_DOWNLOAD_URL` variable. For instance, if you set this variable to `http://yourgame.itch.io`, users will be redirected to this URL if a download link is not available for their platform.

::: info
Replace the `http://localhost:8081` by the url of your own instance.
:::

```sh
curl -X GET 'http://localhost:8081/download'
```

You will get the following response :

```
Found. Redirecting to http://yourgame.itch.io
```

## Device download link

To set up platform-specific redirects, you need to configure the environment variable `HIGHSCORE_<PLATFORM>_DOWNLOAD_URL`, where `PLATFORM` is the device's platform. For example:

| Platform	| Download url|
| --------- | --------------------------------------------------- |
| `HIGHSCORE_WINDOWS_DOWNLOAD_URL`	| https://store.steampowered.com/app/your-game |
| `HIGHSCORE_ANDROID_DOWNLOAD_URL`	| https://play.google.com/store/apps/your-game |

::: tip
You can see all available variables [here](/guide/configuration).
:::

If your are on windows the `/download` will return this :

```
Found. Redirecting to https://store.steampowered.com/app/your-game
```

And if you are on android the `/download` will return this : 

```
Found. Redirecting to https://play.google.com/store/apps/your-game
```

