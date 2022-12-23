# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2022-12-23
### Added
- Add a `meta` field to the score model to store custom data.
- Implement a category system by adding a `category` field.
- Create a category view to display all scores within a specific category.
- Add a privacy view that can be configured using environment variables.

## [0.3.0] - 2022-12-09
### Added
- Add a `/download` endpoint. This route allow you to redirect users depending on their platform.
- Add a **bad words** filter to prevent score with an offensive name.
- Add a rate limit to the whole app to prevent spam.

## [0.2.1] - 2022-10-28
### Fixed
- Fix `dist` folder path for docker. Now the app start with docker.

## [0.2.0] - 2022-10-26
### Added
- Uses a session to store user score.
- Add `/api/score/me` endpoint to get all scores for a user.
- Add `/metrics` endpoint to get metrics using `prom-client`.
- Add a score view to see and share a specific score.
- Add options to disable `/docs` and `/metrics` endpoint.
- Add options to use basic auth for `/docs` and `/metrics` endpoint.

## [0.1.1] - 2022-08-13
### Fixed
- Update CI docker build job.

## [0.1.0] - 2022-08-13
### Added
- Add scores api to manage your games scores.
- Add a default website which list all scores.
- Add envs variables to customize the website.
- Add a spec for the api with openAPI (swagger).

[Unreleased]: https://github.com/EmilienLeroy/HighScore/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/EmilienLeroy/HighScore/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/EmilienLeroy/HighScore/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/EmilienLeroy/HighScore/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/EmilienLeroy/HighScore/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/EmilienLeroy/HighScore/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/EmilienLeroy/HighScore/releases/tag/v0.1.0
