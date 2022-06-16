import { TryAgainError } from "./api/client";
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

  let messagePromise: Promise<MessageEvent<any>> | null = null;
  if (action.waitForMessage) {
    messagePromise = waitForMessage(
      (event) => event.origin === option.origin,
      timeout
    );
  }
  form.submit();
  if (action.waitForMessage) {
    // Waiting for notification msgs
    let messageTimeout = false;
    try {
      const message = await messagePromise!;
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
  } else {
    try {
      const beginTime = new Date().getTime();
      while (new Date().getTime() - beginTime < timeout) {
        try {
          switch (threeDSAuthentication?.state) {
            case "device_fingerprint": {
              const completeIndicator = true;
              const resp = await option.apiClient.finishDeviceFingerprint(
                threeDSAuthentication.id,
                // Not really needed for Paay, just for the interface
                completeIndicator
              );
              return resp;
            }
            case "challenge": {
              const transStatus = "Y";
              const resp = await option.apiClient.finishChallenge(
                threeDSAuthentication.id,
                // Not really needed for Paay, just for the interface
                transStatus
              );
              return resp;
            }
            default: {
              throw new Error(`Invalid state ${threeDSAuthentication.state}`);
            }
          }
        } catch (error) {
          if (error instanceof TryAgainError) {
            console.info("Encounter try again error, will try again");
            continue;
          } else {
            throw error;
          }
        }
      }
    } finally {
      iframe.parentElement?.removeChild(iframe);
    }
  }
};
