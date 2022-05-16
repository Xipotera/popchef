PopChef technical test
-


## Get started

To start server part:
```
make start-server;

```

To start client:
```
make start-client;
```


## How to test (with Postman)

You can find a Postman json file at the root folder [postman_collection](./postman_collection.json).

Just import it on Postman.

I use faker.js to preset the create product endpoint. The result preset the `id` for the other endpoints.

## Issues

Due to a lack of time, I was not able to correct some issues or add some features:

- always error with postgres implementing, i start from existing project, looks like something bad on this
- no docker-compose 
- no test with jest 😢
