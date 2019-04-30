# API integration

How to run it


Use serverless to run it
```
serverless invoke local -f api_integration_transformer -p event/transformer.event.json
```

or 

```
serverless invoke local -f api_integration_transformer -p event/transformer.event.json --watch
```
to automatically execute lambda on code change.


Webpack will automatically compile when running commands like
```serverless package```
or
```serverless deploy```

Simple local end-to-end test
```
ETL_STAGE=dev ETL_DEV_DB_HOST=192.168.99.100 ETL_DEV_DB_USER=root ETL_DEV_DB_PASSWORD=xxx npm run dev:watch
```

Production end-to-end test
```
ETL_JOB_QUEUE_URL=xxx ETL_QUERYER_ARN=xxx npm run dev:watch
```


## Testing

We used JEST also for backend testing. And why jest? 
- We also use it for front-end testing 
- It is faster https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50
- https://codeburst.io/revisiting-node-js-testing-part-1-84c33bb4d711
