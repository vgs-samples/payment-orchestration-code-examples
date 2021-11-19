import os
import requests
from flask import Flask
from flask import render_template, request
from flask import request
from flask_cors import CORS

app = Flask(__name__)
auth_api = "https://auth.verygoodsecurity.com/auth/realms/vgs/protocol/openid-connect/token"

VAULT_ID = os.environ.get('VAULT_ID')

CORS(app)

def get_access_token(scope):
    data = {
        'client_id': os.environ.get('MULTIPLEXING_AUTH_ID'),
        'client_secret': os.environ.get('MULTIPLEXING_AUTH_SECRET'),
        'grant_type': 'client_credentials', 
        'scope': scope,
    }
    response = requests.post(auth_api, data=data)
    print(response.json())
    return response.json()
        
@app.route("/")
def index():
    access_token = get_access_token("financial-instruments:write")
    return render_template('./index.html', tnt=VAULT_ID, accessToken=access_token.get('access_token'))

@app.route("/transfers", methods=['POST'])
def transfer():
    req = request.get_json()
    access_token = get_access_token("transfers:write")
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {}".format(access_token['access_token'])
    }
    transfers_data = {
        "amount": 1 * 100,
        "currency": "USD",
        "source": req['financial_instrument'],
    }
    tr = requests.post('https://{}.sandbox.verygoodproxy.com/transfers'.format(VAULT_ID),
        headers=headers,
        json=transfers_data
    )
    return tr.json()
