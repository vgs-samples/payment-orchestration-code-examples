/**
 * Wait for post message comes in
 * @param filter filter function which will return true when the desired event received
 * @param timeout how long to wait before the waiting times out in ms
 */
export const waitForMessage = (
  filter: (event: MessageEvent) => boolean,
  timeout?: number
) =>
  new Promise<MessageEvent>((resolve, reject) => {
    let callback: any = {};
    const timeoutFlag: { timedOut: boolean } = { timedOut: false };

    callback.value = (event: MessageEvent) => {
      if (!filter(event)) {
        return;
      }
      if (timeoutFlag.timedOut) {
        return;
      }
      window.removeEventListener("message", callback.value);
      resolve(event);
    };

    if (timeout !== undefined) {
      setTimeout(() => {
        timeoutFlag.timedOut = true;
        reject(new Error("Timeout"));
        window.removeEventListener("message", callback.value);
      }, timeout);
    }

    window.addEventListener("message", callback.value);
  });
