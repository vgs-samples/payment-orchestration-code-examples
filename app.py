import os
import json
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
print(PAYMENT_ORCH_APP_DOMAIN)
CORS(app)

def get_access_token():
    data = {
        'client_id': PAYMENT_ORCH_CLIENT_ID,
        'client_secret': PAYMENT_ORCH_CLIENT_SECRET,
        'grant_type': 'client_credentials', 
        # 'scope': 'financial_instremnets:write transfers:write'
    }
    response = requests.post(AUTH_API, data=data)
    print(response.json())
    return response.json()
        
@app.route("/")
def index():
    return render_template('./index.html', customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/checkout", methods=['POST'])
def checkout(): 
    access_token = get_access_token()
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token['access_token'])
    }
    fin_instr_data = request.get_json()      
    print("\n\n=== Aliassed Credit Card ===")
    print(json.dumps(fin_instr_data, sort_keys=True, indent=4))
    fin_instr = requests.post(
        'https://' + PAYMENT_ORCH_APP_DOMAIN + '/financial_instruments',
        proxies = {
            'https': 'https://' + CUSTOMER_VAULT_ACCESS_CREDS_USERNAME + ':' + CUSTOMER_VAULT_ACCESS_CREDS_SECRET + '@' + CUSTOMER_VAULT_ID + '.sandbox.verygoodproxy.com:8443',
        },
        headers=headers,
        json = fin_instr_data,
        verify = False,
        # verify = Path(__file__).resolve().parent / f'certs/sandbox_cert.pem'
    )
    print("\n\n=== Financial Instrument ===")
    print(json.dumps(fin_instr.json(), sort_keys=True, indent=4))
    transfers_data = {
        "amount": 1 * 100,
        "currency": "USD",
        "source": fin_instr.json()['data']['id'],
    }
    transfer = requests.post(
        'https://' + PAYMENT_ORCH_APP_DOMAIN + '/transfers',
        headers = headers,
        json = transfers_data,
    )
    print("\n\n=== Transfer ===")
    print(json.dumps(transfer.json(), sort_keys=True, indent=4))
    
    return transfer.json()

