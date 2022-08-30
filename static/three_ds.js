const amount = 1000;
const currency = "USD";
const vgsUrl =
  "https://tntmrn77zaf-4880868f-d88b-4333-ab70-d9deecdbffc4.sandbox.verygoodproxy.com";
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

  if (!data.data.device_fingerprint.wait_for_message) {
    const wait = async () => {
      // Polling for updates
      while (true) {
        const resp = await fetch(
          `${vgsUrl}/threeds_authentications/${data.data.id}/fingerprints`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${readAccessToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        // TODO: 504 shouldn't happen, we should modify the proxy upstream timeout to be more than 15 seconds
        if (resp.status === 499 || resp.status === 504) {
          console.log("Still loading fingerprint, try again");
          continue;
        }
        const json = await resp.json();
        console.log("Fingerprint resp", resp.status, json);
        return json;
      }
    };
    return wait();
  }

  return new Promise((resolve, reject) => {
    let callback = {};
    callback.value = (message) => {
      console.log("fingerprint message from iframe", message.data);
      window.removeEventListener("message", callback.value);

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
    window.addEventListener("message", callback.value);
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

  if (!data.data.challenge.wait_for_message) {
    const wait = async () => {
      // Polling for updates
      while (true) {
        const resp = await fetch(
          `${vgsUrl}/threeds_authentications/${data.data.id}/challenges`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${readAccessToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        // TODO: 504 shouldn't happen, we should modify the proxy upstream timeout to be more than 15 seconds
        if (resp.status === 499 || resp.status === 504) {
          console.log("Still loading challenge, try again");
          continue;
        }
        const json = await resp.json();
        console.log("Challenge resp", resp.status, json);
        return json;
      }
    };
    return wait();
  }

  return new Promise((resolve, reject) => {
    let callback = {};
    callback.value = (message) => {
      console.log("challenge message from iframe", message.data);
      window.removeEventListener("message", callback.value);
      resolve(
        fetch(`${vgsUrl}/threeds_authentications/${data.data.id}/challenges`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${readAccessToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trans_status: "Y",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("complete challenge", data);
            return data;
          })
      );
    };
    window.addEventListener("message", callback.value);
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
    extra_config: {
      merchantRiskIndicator: {
        shipIndicator: "05 ",
        deliveryTimeFrame: "01 ",
        reorderItemsInd: "02",
      },
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
