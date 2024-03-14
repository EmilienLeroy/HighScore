# Categories

By default, each score is added to the main leaderboard. However, you can create categories to store scores in separate leaderboards.

[[toc]]

## Submitting scores to a custom category

In order to submit a score to a custom leaderboard, you must specify the category by adding the `category` field to the score.

::: info
Replace the `http://localhost:8081` by the url of your own instance.
:::

```sh
curl -X 'POST' \
  'http://localhost:8081/api/scores' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Player",
  "value": 8000,
  "category": "hard"
}'
```

This request will store the score in the `hard` leaderboard :

```json
{
  "_id": "63a3ef4c612b1bcc40a5c520",
  "name": "Player",
  "value": 8000,
  "rank": 2,
  "category": "hard",
  "createdAt": "2022-12-22T05:46:52.925Z",
  "updatedAt": "2022-12-22T05:46:52.925Z"
}
```

## Retrieving scores from a custom category

If you want to retrieve only scores within a particular category, you can use the `category` query parameter in your request.

::: info
Replace the `http://localhost:8081` by the url of your own instance.
:::

```sh
curl -X 'GET' \
  'http://localhost:8081/api/scores?category=hard&limit=50' \
  -H 'accept: application/json'
```

By making this request, you can access the top 50 scores in the `hard` leaderboard.

```json
[
  {
    "_id": "639ffb3d35d1d2ff43aac0b7",
    "name": "Player 1",
    "value": 1000000,
    "rank": 1,
    "category": "hard",
    "createdAt": "2022-12-19T05:48:45.043Z",
    "updatedAt": "2022-12-19T05:48:45.043Z"
  },
  {
    "_id": "63a3ef4c612b1bcc40a5c520",
    "name": "Player",
    "value": 8000,
    "rank": 2,
    "category": "hard",
    "createdAt": "2022-12-22T05:46:52.925Z",
    "updatedAt": "2022-12-22T05:46:52.925Z"
  }
]
```