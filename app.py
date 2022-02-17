import os
from venv import create
import requests
from flask import Flask
from flask import render_template, request
from flask import request
from flask_cors import CORS
from pathlib import Path

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
        'grant_type': 'client_credentials', 
        'scope': 'transfers:write financial-instruments:write',
    }
    response = requests.post(AUTH_API, data=data)
    return response.json()
        
@app.route("/")
def index():
    return render_template('./index.html', customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/checkout", methods=['POST'])
def checkout(): 
    access_token = get_access_token()
    proxies = {
        'https': 'http://' + CUSTOMER_VAULT_ACCESS_CREDS_USERNAME + ':' + CUSTOMER_VAULT_ACCESS_CREDS_SECRET + '@' + PAYMENT_ORCH_APP_DOMAIN + ':8080',
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token['access_token'])
    }
    fin_instr_data = request.get_json()    
    fin_instr = requests.post(
        'https://' + PAYMENT_ORCH_APP_DOMAIN + '/financial_instruments',
        headers = headers,
        json = fin_instr_data,
        proxies = proxies,
        verify = Path(__file__).resolve().parent / f'certs/sandbox_cert.pem'
    )
    transfers_data = {
        "amount": 1 * 100,
        "currency": "USD",
        "source": fin_instr.json()['data']['id'],
    }
    transfer = requests.post(
        'https://' + PAYMENT_ORCH_APP_DOMAIN + '/transfers',
        headers = headers,
        json = transfers_data,
        proxies = proxies,
        verify = Path(__file__).resolve().parent / f'certs/sandbox_cert.pem'
    )
    return transfer.json()

