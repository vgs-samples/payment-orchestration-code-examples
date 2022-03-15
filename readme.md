## VGS Universal Checkout/VGS Collect.js & Payment Orchestration Integration Demo
Before running the application, make sure, that you have access to your [Payment Orchestration Instance & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/quickstart) and all prerequisites are met, gateways and rules are set and you have access credentials to authenticate. The following demo provides integration examples with both Universal Checkout and VGS Collect SDKs, both products can be used with our Payment Orchestration solution. While Universal Checkout gives simplicity and saving time on the integration process, VGS Collect.js allows more customization abilities.

This demo is built with:
- [VGS Payment Orchestration product & API](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration)
- [VGS Universal Checkout JS library](https://www.verygoodsecurity.com/docs/payment-optimization/checkout)
- [VGS Collect JS library](https://www.verygoodsecurity.com/docs/vgs-collect/js) as an alternative solution to the VGS Universal Checkout.

### Flow chart

<img src="https://www.verygoodsecurity.com/docs/vgs_theme/static/img/payment-optimization/checkout-multiplexing-flow.svg"/>

### How to run

#### Prerequisites
1. Provision [Payment Orchestration instance](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/provisioning#provisioning-the-payment-orchestration-api).
2. Configure at least one [Gateway](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/gateways#example).
3. Clone the repo `git clone git@github.com:vgs-samples/payment-orchestration-demo.git`.
4. Create .env file in the root project folder.
5. Fill in the file with the necessary configuration variables shown below.
6. Create [Inbound Route](https://www.verygoodsecurity.com/docs/guides/inbound-connection). Import template from the `./routes/inbound.yaml` and once you run an application with ngrok please update your Inbound Route Upstream Host to match ngrok https url. 
7. Create [Outbound Route](https://www.verygoodsecurity.com/docs/guides/outbound-connection). In the `./routes/outbound.yaml` replace  `host_endpoint: <pay_orch_vault_id>.sandbox.verygoodproxy.com` placeholder with your Payment Orchestration host and import template.

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
`CUSTOMER_VAULT_ACCESS_CREDS_USERNAME`, `CUSTOMER_VAULT_ACCESS_CREDS_SECRET` - Vault [access credentials](https://www.verygoodsecurity.com/docs/settings/access-credentials#access-credentials), user id and secret \
`PAYMENT_ORCH_CLIENT_ID`, `PAYMENT_ORCH_CLIENT_SECRET` - [Credentials](https://www.verygoodsecurity.com/docs/settings/
`PAYMENT_ORCH_APP_DOMAIN` - Domain of your Payment Orchescration application without `https` or `http` 

### How to run locally
1. `python -m venv venv`
2. `. ./venv/bin/activate`
3. `export FLASK_APP=app`
4. `pip install -r ./requirements.txt`
5. `flask run`
6. `ngrok http 5000` for sharing your localhost worldwide
7. Setup ngrok link as upstream for Inbound route on the Dashboard
8. Open http://localhost:5000 or ngrok url in the browser to get example with the <b>Universal Checkout</b> integration.
9. Open http://localhost:5000/collect or ngrok url in the browser to get example with the <b>VGS Collect.js</b> integration.

### How to run with Docker
1. `docker-compose up --build`
2. `ngrok http 5000` for sharing your localhost worldwide
3. Setup ngrok link as upstream for Inbound route on the Dashboard
8. Open http://localhost:5000 or ngrok url in the browser to get example with the <b>Universal Checkout</b> integration.
9. Open http://localhost:5000/collect or ngrok url in the browser to get example with the <b>VGS Collect.js</b> integration.

### How to use
1. Make sure you've created a default gateway
Fill out and submit the form with a test payment card. Please note that a test payment card depends on the gateway you use and can be different if you want to try a successful transaction flow.
```
name: Any Name
number: 4111 1111 1111 1111
expiration_date: 02/25
cvc: 123
```

For more details on how to build your payments flow, check [this guide](https://www.verygoodsecurity.com/docs/payment-optimization/orchestration/payment-flow) out.
