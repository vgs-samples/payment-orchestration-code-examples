## VGS Universal Checkout & Payment Orchestration Integration Demo
Before running the application, make sure, that you have access to your [Payment Orchestration Instance & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/quickstart) and all prerequisites are met, gateways and rules are set and you have access credentials to authenticate.

This demo is built with:
- [VGS Payment Orchestration product & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration)
- [VGS Universal Checkout JS library](https://www.verygoodsecurity.com/docs/payment-optimization/checkout)

### How to run

#### Prerequisites
1. Clone the repo `git clone git@github.com:vgs-samples/payment-orchestration-demo.git`
2. Create .env file in the root project folder
3. Fill in the file with the necessary configuration variables shown below.
4. Create Inbound and Outbound routes from .yaml files. You can find it in `./routes` folder
#### .env file - content description
```
CUSTOMER_VAULT_ID=
CUSTOMER_VAULT_ACCESS_CREDS_USERNAME=
CUSTOMER_VAULT_ACCESS_CREDS_SECRET=
PAYMENT_ORCH_CLIENT_ID=
PAYMENT_ORCH_CLIENT_SECRET=
PAYMENT_ORCH_APP_DOMAIN=
``` 
`CUSTOMER_VAULT_ID` - Your vault id for storing `credit-card` data \
`CUSTOMER_VAULT_ACCESS_CREDS_USERNAME`, `CUSTOMER_VAULT_ACCESS_CREDS_SECRET` - Vault [access credentials](https://www.verygoodsecurity.com/docs/settings/access-credentials#generating-new-credentials), user id and secret \
`PAYMENT_ORCH_CLIENT_ID`, `PAYMENT_ORCH_CLIENT_SECRET` - Payment orchestration [API Credentials](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/api/authentication#api-credentials), please request them at [support@verygoodsecurity.com](support@verygoodsecurity.com) or ask VGS representative.  \
`PAYMENT_ORCH_APP_DOMAIN` - Domain of your Payment Orchescration application without `https` or `http` 

### How to run locally
1. `python -m venv venv`
2. `. ./venv/bin/activate`
3. `export FLASK_APP=app`
4. `pip install -r ./requirements.txt`
5. `flask run`
6. `ngrok http 5000` for sharing your localhost worldwide
7. Setup ngrok link as upstream for Inbound route on the Dashboard
8. Open `http://localhost:5000` in browser

### How to run with Docker
1. `docker-compose up --build`
2. `ngrok http 5000` for sharing your localhost worldwide
3. Setup ngrok link as upstream for Inbound route on the Dashboard
5. Open `http://localhost:5000` in browser

### How to use
Fill and submit the Universal Checkout form with a test payment card. Please note that a test payment card depends on the gateway you use and can be different if you want to try a successful transaction flow.
```
cardholder: Any Name
cc: 4111 1111 1111 1111
exp.date: 02/23
cvc: 123
```

For more details on how to build your payments flow, check [this guide](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/payment-flow) out.
