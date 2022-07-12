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
    # t = '{"data":{"id":"TRsP4GwovLQqebzCepc4JjDy","currency":"USD","amount":100,"created_at":"2022-05-31T15:00:06.376573Z","updated_at":"2022-05-31T15:00:06.376573Z","type":"debit","fee":0,"gateway_response":{"id":"ch_3L5WYFBziqj0MioS00Pi4nlx","state":"successful","message":"Transaction approved","error_code":"","raw_response":"{\\"id\\":\\"ch_3L5WYFBziqj0MioS00Pi4nlx\\",\\"object\\":\\"charge\\",\\"amount\\":100,\\"amount_captured\\":100,\\"amount_refunded\\":0,\\"application\\":null,\\"application_fee\\":null,\\"application_fee_amount\\":null,\\"balance_transaction\\":\\"txn_3L5WYFBziqj0MioS054lmJMh\\",\\"billing_details\\":{\\"address\\":{\\"city\\":null,\\"country\\":null,\\"line1\\":null,\\"line2\\":null,\\"postal_code\\":null,\\"state\\":null},\\"email\\":null,\\"name\\":\\"qweqwe\\",\\"phone\\":null},\\"calculated_statement_descriptor\\":\\"Stripe\\",\\"captured\\":true,\\"created\\":1654009207,\\"currency\\":\\"usd\\",\\"customer\\":null,\\"description\\":null,\\"destination\\":null,\\"dispute\\":null,\\"disputed\\":false,\\"failure_balance_transaction\\":null,\\"failure_code\\":null,\\"failure_message\\":null,\\"fraud_details\\":{},\\"invoice\\":null,\\"livemode\\":false,\\"metadata\\":{\\"order_id\\":\\"79c194a23b42cc33e131\\"},\\"on_behalf_of\\":null,\\"order\\":null,\\"outcome\\":{\\"network_status\\":\\"approved_by_network\\",\\"reason\\":null,\\"risk_level\\":\\"normal\\",\\"risk_score\\":9,\\"seller_message\\":\\"Payment complete.\\",\\"type\\":\\"authorized\\"},\\"paid\\":true,\\"payment_intent\\":null,\\"payment_method\\":\\"card_1L5WYFBziqj0MioSeKyqmhCB\\",\\"payment_method_details\\":{\\"card\\":{\\"brand\\":\\"visa\\",\\"checks\\":{\\"address_line1_check\\":null,\\"address_postal_code_check\\":null,\\"cvc_check\\":\\"pass\\"},\\"country\\":\\"US\\",\\"exp_month\\":12,\\"exp_year\\":2033,\\"fingerprint\\":\\"9yXdTrQbAoZEeM72\\",\\"funding\\":\\"credit\\",\\"installments\\":null,\\"last4\\":\\"1111\\",\\"mandate\\":null,\\"network\\":\\"visa\\",\\"three_d_secure\\":null,\\"wallet\\":null},\\"type\\":\\"card\\"},\\"receipt_email\\":null,\\"receipt_number\\":null,\\"receipt_url\\":\\"https://pay.stripe.com/receipts/acct_1DbzCIBziqj0MioS/ch_3L5WYFBziqj0MioS00Pi4nlx/rcpt_Ln6lepla4aYbzdGZk2scmQhvi4TkSnK\\",\\"refunded\\":false,\\"refunds\\":{\\"object\\":\\"list\\",\\"data\\":[],\\"has_more\\":false,\\"total_count\\":0,\\"url\\":\\"/v1/charges/ch_3L5WYFBziqj0MioS00Pi4nlx/refunds\\"},\\"review\\":null,\\"shipping\\":null,\\"source\\":{\\"id\\":\\"card_1L5WYFBziqj0MioSeKyqmhCB\\",\\"object\\":\\"card\\",\\"address_city\\":null,\\"address_country\\":null,\\"address_line1\\":null,\\"address_line1_check\\":null,\\"address_line2\\":null,\\"address_state\\":null,\\"address_zip\\":null,\\"address_zip_check\\":null,\\"brand\\":\\"Visa\\",\\"country\\":\\"US\\",\\"customer\\":null,\\"cvc_check\\":\\"pass\\",\\"dynamic_last4\\":null,\\"exp_month\\":12,\\"exp_year\\":2033,\\"fingerprint\\":\\"9yXdTrQbAoZEeM72\\",\\"funding\\":\\"credit\\",\\"last4\\":\\"1111\\",\\"metadata\\":{},\\"name\\":\\"qweqwe\\",\\"tokenization_method\\":null},\\"source_transfer\\":null,\\"statement_descriptor\\":null,\\"statement_descriptor_suffix\\":null,\\"status\\":\\"succeeded\\",\\"transfer_data\\":null,\\"transfer_group\\":null}"},"state":"successful","gateway":{"type":"stripe","default_currency":"USD","config":{"login":"tok_sandbox_wRnDjzbjffKGKRTV1ddkg8"},"default_gateway":true,"id":"stripe-test-default","created_at":"2022-04-05T19:10:02.810218Z","updated_at":"2022-04-05T19:10:02.810218Z"},"avs_result":{"code":null,"message":null,"street_match":null,"postal_match":null},"source":"FNkWTkk8CmKQQcfbKkKojw23","destination":null,"amount_reversed":0,"amount_captured":100,"captures":[],"three_ds_authentication":null}}'
    # print('qqqqq--q-q--q-q-q-', t.json())
    print('TRANSFER--------->',transfer.content)
    return transfer.json()

