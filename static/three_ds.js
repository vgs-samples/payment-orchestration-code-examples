const amount = 1000;
const currency = "USD";
const vgsUrl = "https://tntmrn77zaf-4880868f-d88b-4333-ab70-d9deecdbffc4.sandbox.verygoodproxy.com";
const readAccessToken = () => document.getElementById("token").textContent;

const authentication = async (finInstrumentId) => {
  const data3ds = {
    card: finInstrumentId,
    amount: amount,
    currency: currency,
    origin: window.location.origin,
    browser_info: {
      java_enabled: window.navigator.javaEnabled(),
      language: window.navigator.language,
      color_depth: window.screen.colorDepth,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      timezone: new Date().getTimezoneOffset(),
      user_agent: window.navigator.userAgent,
    },
  };
  const authRespRaw = await fetch(`${vgsUrl}/threeds_authentications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data3ds),
  })
  
  return await authRespRaw.json()
}

const deviceFingerptint = async (fingerprint) => {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("name", "fingerprint");
  iframe.setAttribute("id", "vgs-device-fingerprint-iframe")
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.setAttribute("action", fingerprint.device_fingerprint.url);
  form.setAttribute("target", "fingerprint");
  form.setAttribute("method", "POST");
  form.setAttribute("id", "vgs-device-fingerprint-form")
  for (const [key, value] of Object.entries(
    fingerprint.device_fingerprint.params
  )) {
    const input = document.createElement("input");
    input.setAttribute("name", key);
    input.setAttribute("value", value);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  await form.submit();
  const deviceFingerptintFinishRaw = await fetch( `${vgsUrl}/threeds_authentications/${fingerprint.id}/fingerprints`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      complete_indicator: "Y",
    }),
  })
  const deviceFingerptintFinish = await deviceFingerptintFinishRaw.json()
  document.getElementById('vgs-device-fingerprint-iframe').remove()
  document.getElementById('vgs-device-fingerprint-form').remove()
  return deviceFingerptintFinish
}

const tryChallenge = async (challenge) => {
  console.log('Start Challenge', challenge)
  var iframe = document.createElement("iframe");
  iframe.setAttribute("name", "challenge");
  iframe.setAttribute("id", "vgs-device-challenge-iframe")
  iframe.width = 600;
  iframe.height = 700;
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.setAttribute("action",challenge.challenge.url);
  form.setAttribute("target", "challenge");
  form.setAttribute("method", "POST");
  form.setAttribute("id", "vgs-device-challenge-form")

  for (const [key, value] of Object.entries(
    challenge.challenge.params
  )) {
    const input = document.createElement("input");
    input.setAttribute("name", key);
    input.setAttribute("value", value);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  console.log('submit')
  await form.submit();
  console.log('submit Finish')
  window.addEventListener("message", (data) => {
    console.log('data', data)
  });
  const challengeFinishRaw = await fetch(`${vgsUrl}/threeds_authentications/${challenge.id}/challenges`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      trans_status: "Y",
    }),
  })
  const challengeFinish = challengeFinishRaw.json()
  console.log('challenge finish -->', challengeFinish)
  document.getElementById('vgs-device-challenge-iframe').remove()
  document.getElementById('vgs-device-challenge-form').remove()
  return challengeFinish
}


const three = async (fId) => {
  const auth = await authentication(fId)
  console.log('==> Before make3DS()')
  const threeDS = await make3DS(auth.data)
  console.log('==> LAST RETURN!', threeDS)
  return threeDS
  async function make3DS(threeDSData) {
    console.log('==> make3DS() start')
    let threeDSResult = null
    let all = null
    switch (threeDSData.state) {
      case "device_fingerprint":
        console.log('==> Device Fingerprint Case')
        threeDSResult = await deviceFingerptint(threeDSData)
        all = await make3DS(threeDSResult.data)
        return all
      case "challenge":
        console.log('==> Challenge Case')
        threeDSResult = await tryChallenge(threeDSData)
        console.log('==> Challenge Finish',  threeDSResult)
        all = await make3DS(threeDSResult.data)
        return all
      case "successful":
        console.log('==> 3ds Successful state', threeDSData)
        return threeDSData
      default:
        console.log('==> Unexpected responce', threeDSData)
        return threeDSData
    }
  }
}
