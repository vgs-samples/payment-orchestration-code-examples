## VGS Universal Checkout & Payment Orchestration Integration Demo
Before running the application, make sure, that you have access to your [Payment Orchestration Instance & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/quickstart) and all prerequisites are met, gateways and rules are set and you have access credentials to authenticate.

This demo is built with:
- [VGS Payment Orchestration product & API](https://www.verygoodsecurity.com/docs/payment-optimization/checkout)
- [VGS Universal Checkout JS library](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration)

### How to run
1. `Git clone git@github.com:vgs-samples/payment-orchestration-demo.git` 
2. Create `.env` file in the project root folder
3. Set up enviroment variables
Please note, you need to use [Payments credentials](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/api/authentication#payments-credentials)
```
CUSTOMER_VAULT_ID=
PAYMENT_ORCH_VAULT_ID=
PAYMENT_ORCH_CLIENT_ID=
PAYMENT_ORCH_CLIENT_SECRET=
PAYMENT_ORCH_OUTBOUND_PROXY_ID=
PAYMENT_ORCH_OUTBOUND_PROXY_SECRET=
```
4. `pythom -m venv venv`
5. `. ./venv/bin/activate`
6. `export FLASK_APP=app`
7. `pip install -r ./requirements.txt`
8. `flask run`
9. `ngrok http 5000` for sharing your localhost worldwide
10. `Apply routes from /routes folder and setup ngrok link as upstream for inbound route on the Dashboard`
11. Open `http://localhost:5000` in browser

### How to run with Docker
1. `Git clone git@github.com:vgs-samples/multiplexing-integration-demo.git` 
2. Create `.env` file in the project root folder
3. Set up enviroment variables
Please note, you need to use [Payments credentials](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/api/authentication#payments-credentials)
```
CUSTOMER_VAULT_ID=
PAYMENT_ORCH_VAULT_ID=
PAYMENT_ORCH_CLIENT_ID=
PAYMENT_ORCH_CLIENT_SECRET=
PAYMENT_ORCH_OUTBOUND_PROXY_ID=
PAYMENT_ORCH_OUTBOUND_PROXY_SECRET=
``` 
4. `docker-compose up --build`
5. `ngrok http 5000` for sharing your localhost worldwide
6. `Setup ngrok link as upstream for inbound route on the Dashboard`
7. `Apply routes from /routes folder and setup ngrok link as upstream for inbound route on the Dashboard`
8. Open `http://localhost:5000` in browser

### How to use
Fill and submit the Universal Checkout form with a test payment card. Please note that a test payment card depends on the gateway you use and can be different if you want to try a successful transaction flow.
```
cardholder: Any Name
cc: 4111 1111 1111 1111
exp.date: 02/22
cvc: 123
```

For more details on how to build your payments flow, check [this guide](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/payment-flow) out.
