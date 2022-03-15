require 'oauth2'

client_id = ENV["VGS_CLIENT_ID"]
client_secret = ENV["VGS_CLIENT_SECRET"]
client = OAuth2::Client.new(client_id, client_secret, token_url: 'https://auth.verygoodsecurity.com/auth/realms/vgs/protocol/openid-connect/token')

token = client.client_credentials.get_token
puts token
