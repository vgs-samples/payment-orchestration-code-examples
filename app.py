# from crypt import methods
import os
import requests
from flask import Flask
from flask import render_template, request
from flask import request
from flask_cors import CORS
from pathlib import Path

app = Flask(__name__)
auth_api = "https://auth.verygoodsecurity.com/auth/realms/vgs/protocol/openid-connect/token"

VAULT_ID = os.environ.get('PAYMENT_ORCH_VAULT_ID')
CUSTOMER_VAULT_ID = os.environ.get('CUSTOMER_VAULT_ID')
PAYMENT_ORCH_OUTBOUND_PROXY_ID = os.environ.get('PAYMENT_ORCH_OUTBOUND_PROXY_ID')
PAYMENT_ORCH_OUTBOUND_PROXY_SECRET = os.environ.get('PAYMENT_ORCH_OUTBOUND_PROXY_SECRET')

CORS(app)

def get_access_token():
    data = {
        'client_id': os.environ.get('PAYMENT_ORCH_CLIENT_ID'),
        'client_secret': os.environ.get('PAYMENT_ORCH_CLIENT_SECRET'),
        'grant_type': 'client_credentials', 
    }
    response = requests.post(auth_api, data=data)
    return response.json()
        
@app.route("/")
def index():
    print('---->', Path(__file__).resolve().parent / f'certs/sandbox_cert.pem')

    return render_template('./index.html', customerVaultId = CUSTOMER_VAULT_ID)

@app.route("/checkout", methods=['POST'])
def checkout():
    # ==> Save aliassed credit card to DB here <==
    access_token = get_access_token()
    proxies = {
        'https': 'https://{}:{}@{}.sandbox.verygoodproxy.com:8443'.format(PAYMENT_ORCH_OUTBOUND_PROXY_ID, PAYMENT_ORCH_OUTBOUND_PROXY_SECRET, CUSTOMER_VAULT_ID),
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token['access_token'])
    }
    fin_instr_data = request.get_json()
    fin_instr = requests.post('https://{}.sandbox.verygoodproxy.com/financial_instruments'.format(VAULT_ID),
        headers = headers,
        json = fin_instr_data,
        proxies = proxies,
        # verify = '/Users/flor/workspace/work/payment-orchestration-demo/certs/sandbox_cert.pem'
        verify = Path(__file__).resolve().parent / f'certs/sandbox_cert.pem'
        # verify = False
    )
    transfers_data = {
        "amount": 1 * 100,
        "currency": "USD",
        "source": fin_instr.json()['data']['id'],
    }
    transfer = requests.post(
        'https://{}.sandbox.verygoodproxy.com/transfers'.format(VAULT_ID),
        headers = headers,
        json = transfers_data,
        proxies = proxies,
        verify = Path(__file__).resolve().parent / f'certs/sandbox_cert.pem'
        # verify = False
    )
    return transfer.json()

