## VGS Universal Checkout & Payment Orchestration Integration Demo
Before running the application, make sure, that you have access to your [Payment Orchestration Instance & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/quickstart) and all prerequisites are met, gateways and rules are set and you have access credentials to authenticate.

This demo is built with:
- [VGS Payment Orchestration product & API](https://www.verygoodsecurity.com/docs/payment-optimization/checkout)
- [VGS Universal Checkout JS library](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration)

### How to run
1. `Git clone git@github.com:vgs-samples/multiplexing-integration-demo.git` 
2. Create `.env` file in the project root folder
3. Set up enviroment variables
```
TNT_ID=
MULTIPLEXING_AUTH_ID=
MULTIPLEXING_AUTH_SECRET=
```
4. `export FLASK_APP=app`
5. `flask run`
6. Open `http://localhost:5000` in browser

### How to run with Docker
1. `Git clone git@github.com:vgs-samples/multiplexing-integration-demo.git` 
2. Create `.env` file in the project root folder
3. Set up enviroment variables
```
TNT_ID=
MULTIPLEXING_AUTH_ID=
MULTIPLEXING_AUTH_SECRET=
``` 
4. `docker-compose up --build`
5. Open `http://localhost:5000` in browser

### How to use
Fill and submit the Universal Checkout form with a test payment card. Please note that a test payment card depends on the gateway you use and can be different if you want to try a successful transaction flow.
```
cc: 4111 1111 1111 1111
exp.date: 02/22
cvc: 123
```

For more details on how to build your payments flow, check [this guide](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/payment-flow) out.
