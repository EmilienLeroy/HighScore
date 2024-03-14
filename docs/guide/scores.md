# Scores
You can easily retrieve or submit a score to a leaderboard using the Highscore REST API. Use the `/api/scores` endpoint, with the base URL specific to your installation. It is easy to use this endpoint to manipulate scores in the leaderboard.


::: info
You can use the `/docs` endpoint to view a list of all available routes and their associated parameters. This can be helpful for understanding the full range of functionality offered by the highscore REST API.
:::

[[toc]]


## Submit a score


To add a score to the leaderboard, you only need to provide two fields in the request body: `name` and `value`. These fields represent the name of the player and the score that they achieved, respectively.

::: info
Replace the `http://localhost:8081` by the url of your own instance.
:::

```sh
curl -X 'POST' \
  'http://localhost:8081/api/scores' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{ "name": "Player name", "value": 1000 }'
```

This will return a response indicating whether the score was successfully added to the leaderboard.

```json
{
  "_id": "63a2a0c87ce37ecb74897485",
  "name": "Player Name",
  "value": 1000,
  "rank": 8,
  "createdAt": "2022-12-21T05:59:36.674Z",
  "updatedAt": "2022-12-21T05:59:36.674Z"
}
```

Here is an explanation for each field :

| Field        | Description       | 
| --------------- | ----------------- |
| `_id` | ID of the score| 
| `name` | Name of the player| 
| `value` | Score achieved by the player| 
| `rank` | 	Position of the score on the leaderboard| 
| `createAt` |	Date when the score was created| 
| `updateAt` | 	Date when the score was last updated | 


## Retrieve a single score

To retrieve a specific score, you will need to know its ID. Here is an example of how to do this :

::: info
Replace the `http://localhost:8081` by the url of your own instance.
:::


```sh
curl -X 'GET' \
  'http://localhost:8081/api/scores/63a2a0c87ce37ecb74897485' \
  -H 'accept: application/json'
```

It will return the complete score in the following format :

```json
{
  "_id": "63a2a0c87ce37ecb74897485",
  "name": "Player Name",
  "value": 1000,
  "rank": 8,
  "createdAt": "2022-12-21T05:59:36.674Z",
  "updatedAt": "2022-12-21T05:59:36.674Z"
}
```


## Retrieve multiple scores

Using the `/api/scores` endpoint, you can retrieve all of the scores stored in the application. You can use the `limit` query parameter to specify the maximum number of scores that you want to receive in the response. To skip a certain number of scores at the beginning of the list, you can use the `skip` query parameter.

:::info
If you have a large number of scores stored in the application, it may take some time to retrieve all of them at once. To prevent this from causing a strain on the server, it is recommended to use the `limit` parameter to retrieve scores in smaller batches. This will also make it easier to process the data on the client side.
:::

### Fetch all scores

```sh
curl -X 'GET' \
  'http://localhost:8081/api/scores' \
  -H 'accept: application/json'
```

### Fetch top 50 scores

```sh
curl -X 'GET' \
  'http://localhost:8081/api/scores?limit=50' \
  -H 'accept: application/json'
```

### Fetch scores between ranks 50 and 100

```sh
curl -X 'GET' \
  'http://localhost:8081/api/scores?limit=50&skip=50' \
  -H 'accept: application/json'
```

All of these requests will return an array of scores in the following format :

```json
[
  {
    "_id": "639c08184523cf7be94de950",
    "name": "Player 1",
    "value": 10000000000,
    "rank": 1,
    "createdAt": "2022-12-16T05:54:32.414Z",
    "updatedAt": "2022-12-16T05:54:32.414Z"
  },
  {
    "_id": "639ffb2835d1d2ff43aac0b4",
    "name": "Player 8000",
    "value": 1000000,
    "rank": 2,
    "createdAt": "2022-12-19T05:48:24.949Z",
    "updatedAt": "2022-12-19T05:48:24.949Z"
  }
]
```






