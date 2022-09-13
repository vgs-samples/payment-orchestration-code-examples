import os
from venv import create
import requests
from flask import Flask
from flask import render_template, request
from flask import request
from flask_cors import CORS
from pathlib import Path
import json

app = Flask(__name__)

AUTH_API = "https://auth.verygoodsecurity.com/auth/realms/vgs/protocol/openid-connect/token"
CUSTOMER_VAULT_ID = os.environ.get('CUSTOMER_VAULT_ID')
PAYMENT_ORCH_APP_DOMAIN = os.environ.get('PAYMENT_ORCH_APP_DOMAIN')
PAYMENT_ORCH_CLIENT_ID = os.environ.get('PAYMENT_ORCH_CLIENT_ID')
PAYMENT_ORCH_CLIENT_SECRET = os.environ.get('PAYMENT_ORCH_CLIENT_SECRET')
CUSTOMER_VAULT_ACCESS_CREDS_USERNAME = os.environ.get('CUSTOMER_VAULT_ACCESS_CREDS_USERNAME')
CUSTOMER_VAULT_ACCESS_CREDS_SECRET = os.environ.get('CUSTOMER_VAULT_ACCESS_CREDS_SECRET')

CORS(app)

def get_access_token():
    data = {
        'client_id': PAYMENT_ORCH_CLIENT_ID,
        'client_secret': PAYMENT_ORCH_CLIENT_SECRET,
        'grant_type': 'client_credentials'
    }
    response = requests.post(AUTH_API, data=data)
    return response.json()
        
@app.route("/")
def index():
    access_token = get_access_token()
    return render_template('./index.html', access_token = access_token['access_token'], customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/transfer")
def transfer():
    access_token = get_access_token()
    return render_template('./transfer.html', access_token = access_token['access_token'], customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/three-ds")
def three_ds():
    access_token = get_access_token()
    return render_template('./three-ds.html', access_token = access_token['access_token'], customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/saved-cards")
def saved_cards():
    access_token = get_access_token()
    return render_template('./saved-cards.html', access_token = access_token['access_token'], customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/checkout", methods=['POST'])
def checkout():
    fin_instrument = request.get_json()
    access_token = get_access_token()
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token['access_token'])
    }   
    transfers_data = {
        "amount": 1 * 100,
        "currency": "USD",
        "source": fin_instrument.get('id'),
    }

    transfer = requests.post(
        'https://' + 'payments.sandbox.verygoodsecurity.app' + '/transfers',
        headers = headers,
        json = transfers_data,
    )
    return transfer.json()

