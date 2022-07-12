const amount = 1
const currency = "USD"
const vgsUrl = 'https://tntipgdjdyl-4880868f-d88b-4333-ab70-d9deecdbffc4.sandbox.verygoodproxy.com'

const tryTransfer = (fId, data) => {
  fetch(`${vgsUrl}/transfers`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "amount": amount,
      "currency": currency,
      "source": fId,
      "three_ds_authentication": data.data.id
    })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  })
}

const tryDeviceFingerprint = (data) => {
  window.addEventListener('message', message => {
    console.log('message', message)
  });

  var iframe = document.createElement('iframe');
  iframe.src = `${data.data.device_fingerprint.url}?threeDSMethodData=${data.data.device_fingerprint.params.threeDSMethodData}`
  document.body.appendChild(iframe);
}

const readAccessToken = () => document.getElementById('token').textContent

const threeDsAuth = () => {
  const fId = document.getElementById('fin_id_input').value
  
  const data3ds = {
    "card": fId,
    "amount": amount,
    "currency": currency,
    "origin": "https://689f-79-110-134-104.ngrok.io/",
    "browser_info": {
      "java_enabled": false,
      "language": "en-US",
      "color_depth": "32",
      "screen_width": "1280",
      "screen_height": "720",
      "timezone": "420",
      "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36"
    }
  }

  fetch(`${vgsUrl}/3ds_authentications`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data3ds)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('data--', data.data.id, data.data.state)
    console.log(data.data)
    if (data.data.state === "device_fingerprint") {
      tryDeviceFingerprint(data)
    }
    if (data.data.state === "successful") {
      tryTransfer(fId, data)
    }
    
  
  })
}


document.getElementById('three_ds_btn').addEventListener('click', (e) => {
  e.preventDefault()
  threeDsAuth()
})

