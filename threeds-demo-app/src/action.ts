import APIInterface, {
  ThreeDSAction,
  ThreeDSAuthentication,
} from "./api/interface";
import { createForm } from "./form";
import { createIframe } from "./iframe";
import { waitForMessage } from "./message";

export interface PerformActionOption {
  readonly apiClient: APIInterface;
  readonly iframeContainer: HTMLElement;
  readonly origin: string;
  readonly iframeName?: string;
  readonly decorateIframe?: (iframe: HTMLIFrameElement) => void;
}

export const getCurrentAction = (
  threeDSAuthentication: ThreeDSAuthentication
): ThreeDSAction | undefined => {
  switch (threeDSAuthentication.state) {
    case "device_fingerprint": {
      return threeDSAuthentication.deviceFingerprint!;
    }
    case "challenge": {
      return threeDSAuthentication.challenge!;
    }
  }
};

export const performAction = async (
  threeDSAuthentication: ThreeDSAuthentication,
  option: PerformActionOption
) => {
  const action = getCurrentAction(threeDSAuthentication);
  if (action === undefined) {
    throw new Error(`Invalid state ${threeDSAuthentication.state}`);
  }

  const iframeName = option.iframeName ?? "action-iframe";
  const iframe = createIframe(option.iframeContainer, iframeName, () => {});
  option.decorateIframe?.(iframe);
  const form = createForm(
    option.iframeContainer,
    action.url,
    iframeName,
    action.params
  );

  const timeout =
    threeDSAuthentication?.state === "device_fingerprint"
      ? 10 * 1000
      : 10 * 60 * 1000;

  const messagePromise = waitForMessage(
    (event) => event.origin === option.origin,
    timeout
  );
  form.submit();
  let messageTimeout = false;
  try {
    const message = await messagePromise;
    console.info("Receive post notification message", message);
  } catch {
    console.info("Timeout while waiting for post notification message");
    messageTimeout = true;
  }
  iframe.parentElement?.removeChild(iframe);
  switch (threeDSAuthentication?.state) {
    case "device_fingerprint": {
      const completeIndicator = !messageTimeout;
      const resp = await option.apiClient.finishDeviceFingerprint(
        threeDSAuthentication.id,
        completeIndicator
      );
      return resp;
    }
    case "challenge": {
      const transStatus = messageTimeout ? "N" : "Y";
      const resp = await option.apiClient.finishChallenge(
        threeDSAuthentication.id,
        transStatus
      );
      return resp;
    }
    default: {
      throw new Error(`Invalid state ${threeDSAuthentication.state}`);
    }
  }
};
