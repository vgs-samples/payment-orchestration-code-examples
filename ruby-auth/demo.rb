require 'oauth2'

client_id = ENV["VGS_CLIENT_ID"]
client_secret = ENV["VGS_CLIENT_SECRET"]
token_url = ENV["VGS_OAUTH_TOKEN_ENDPOINT"] || "https://auth.verygoodsecurity.com/auth/realms/vgs/protocol/openid-connect/token"
client = OAuth2::Client.new(
  client_id,
  client_secret,
  token_url: token_url,
)

# This creates a token for accessing VGS payment orchestration API
access_token = client.client_credentials.get_token

# Here's your token
puts access_token.token

# Then, for example, say you want to create a stripe gateway,
# with the access token given if it has enough permission,
# you can do this
res = con.post do |req| 
  req.url 'https://tntsfeqzp4a.sandbox.verygoodproxy.com/gateways' 
  # Here you pass the access token value by setting the `Authorization` header
  # with value as "Bearer #{access_token.token}"
  req.headers['Authorization'] = "Bearer #{access_token.token}"
  {
    id: "stripe-default",
    type: "stripe",
    default_gateway: true,
    default_currency: "USD",
    config: {
      login: "<STRIPE_API_KEY>"
    }
  }
end
puts res.inspect
