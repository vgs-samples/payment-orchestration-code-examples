## Chechout - Multiplexing integration demo
Before run the applicaiton, make sure, that you install a [Multiplexing applicaiton](https://60e5d733066228abd877fc56--vgs-docs.netlify.app/docs/payment-optimization/multiplexing/guide), create a gateways and rules and get credentials for authorisation in Multiplexing application

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
Fill and submit the checkout form with test credit card
```
cc: 4111 1111 1111 1111
exp.date: 02/22
cvc: 123
```
