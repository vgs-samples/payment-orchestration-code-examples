const amount = 1000;
const currency = "USD";
const vgsUrl =
  "https://tntipgdjdyl-4880868f-d88b-4333-ab70-d9deecdbffc4.sandbox.verygoodproxy.com";
const readAccessToken = () => document.getElementById("token").textContent;

const makeTransferWith3DS = (fId, threeDsData) => {
  return fetch(`${vgsUrl}/transfers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      currency: currency,
      source: fId,
      // "three_ds_authentication": threeDsData.data.id
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

const tryDeviceFingerprint = (data) => {
  var iframe = document.createElement("iframe");
  iframe.setAttribute("name", "fingerprint");
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.setAttribute("action", data.data.device_fingerprint.url);
  form.setAttribute("target", "fingerprint");
  form.setAttribute("method", "POST");
  for (const [key, value] of Object.entries(
    data.data.device_fingerprint.params
  )) {
    const input = document.createElement("input");
    input.setAttribute("name", key);
    input.setAttribute("value", value);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();

  return new Promise((resolve, reject) => {
    const callback = (message) => {
      console.log("fingerprint message from iframe", message.data);
      resolve(
        fetch(
          `${vgsUrl}/threeds_authentications/${data.data.id}/fingerprints`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${readAccessToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              complete_indicator: "Y",
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("complete fingerprints", data);
            return data;
          })
      );
    };

    window.addEventListener("message", (message) => {
      callback(message);
      window.removeEventListener("message", callback);
    });
  });
};

const tryChallengeFlow = (data) => {
  console.log("Challenge Flow ==>", data);
  var iframe = document.createElement("iframe");
  iframe.setAttribute("name", "challenge");
  iframe.src = `${data.data.challenge.url}`;
  iframe.width = 600;
  iframe.height = 700;
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.setAttribute("action", data.data.challenge.url);
  form.setAttribute("target", "challenge");
  form.setAttribute("method", "POST");
  for (const [key, value] of Object.entries(data.data.challenge.params)) {
    const input = document.createElement("input");
    input.setAttribute("name", key);
    input.setAttribute("value", value);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();

  return new Promise((resolve, reject) => {
    window.addEventListener("message", (message) => {
      console.log("message from iframe Challenge", message.data);
      resolve(
        fetch(`${vgsUrl}/threeds_authentications/${data.data.id}/challenges`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${readAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            complete_indicator: "Y",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("complete challenge", data);
            return data;
          })
      );
    });
  });

  // window.open(`${data.data.challenge.url}?creq=${data.data.challenge.params.creq}`, '_blank')
};

const threeDsAuth = () => {
  const fId = document.getElementById("fin_id_input").value;

  const data3ds = {
    card: fId,
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
  fetch(`${vgsUrl}/threeds_authentications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${readAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data3ds),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("3ds_authentications ==>", data.data);
      if (data.data.state === "device_fingerprint") {
        return tryDeviceFingerprint(data);
      }
      if (data.data.state === "challenge") {
        return tryChallengeFlow(data);
      }
      if (data.data.state === "successful") {
        return makeTransferWith3DS(fId, data);
      }
    })
    .then((data) => {
      console.log("3ds_authentications ==>", data.data);
      if (data.data.state === "device_fingerprint") {
        return tryDeviceFingerprint(data);
      }
      if (data.data.state === "challenge") {
        return tryChallengeFlow(data);
      }
      if (data.data.state === "successful") {
        return makeTransferWith3DS(fId, data);
      }
    });
};

document.getElementById("three_ds_btn").addEventListener("click", (e) => {
  e.preventDefault();
  threeDsAuth();
});
