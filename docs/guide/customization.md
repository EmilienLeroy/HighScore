# Customization

HighScore allow you to customize the default web site using your own brand.

[[toc]]

## The `/custom` endpoint

By default highscore expose the `custom` folder into a static endpoint `/custom`.
For example, you have the following files into the `custom` folder :

```
├── ...
├── custom                  # Static files
│   ├── logo.png            # a custom logo
│   ├── favicon.ico         # a custom favicon
│   └── style.css           # a custom style
└── ...
```

These files will be exposed like this :

```
https://HIGHSCORE_URL/custom/logo.png
https://HIGHSCORE_URL/custom/style.css
```


## Environnement variables

Using environnement variable allow you to update the name and the description of the default website.
But you can also add your own logo and style. Depending on the previous custom configuration. 
This is a custom configuration :

```
HIGHSCORE_TITLE=My Custom Leaderboard
HIGHSCORE_DESCRIPTION=My super highscore instance
HIGHSCORE_LOGO_URL=/custom/logo.png
HIGHSCORE_FAVICON_URL=/custom/favicon.ico
HIGHSCORE_CSS_URL=/custom/styles.css
```

:::tip
Go to the [configuration](/guide/configuration) section to get more informations about each environnement variables.
:::

## CSS variables

If you have added a custom style you can easly update leaderboard using css variable. 
These are all current css variable :

```css
:root {
  --highscore-logo-height: 115px;
  --highscore-logo-width: 115px;

  --highscore-primary-rgb: 94, 216, 255;
  --highscore-secondary-rgb: 22, 86, 146;
  --highscore-white-rgb: 255, 255, 255;
  --highscore-text-rgb: 0, 0, 0;

  --highscore-primary-color: rgb(var(--highscore-primary-rgb));
  --highscore-secondary-color: rgb(var(--highscore-secondary-rgb));
  --highscore-white-color: rgb(var(--highscore-white-rgb));
  --highscore-text-color: rgb(var(--highscore-text-rgb));

  --highscore-text-gradient-color: linear-gradient(90deg, var(--highscore-white-color) 0%, rgba(255, 255, 255, 0.12) 100%);
  --highscore-score-gradient-color: linear-gradient(90deg, var(--highscore-white-color) 0%, rgba(var(--highscore-white-rgb), 0.1) 79.84%);
  --highscore-gradient-color: linear-gradient(112.23deg, var(--highscore-primary-color) 0%, var(--highscore-secondary-color) 103.45%);

  --highscore-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
}
```