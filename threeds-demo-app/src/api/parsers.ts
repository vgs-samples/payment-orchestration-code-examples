import {
  Card,
  ThreeDSAction,
  ThreeDSAuthentication,
  Transfer,
} from "./interface";

export const parseCard = (payload: any): Card =>
  ({
    id: payload.data.id,
  } as Card);

export const parseThreeDSAction = (payload: any): ThreeDSAction =>
  ({
    url: payload.url,
    params: payload.params,
    waitForMessage: payload.wait_for_message,
  } as ThreeDSAction);

export const parseThreeDSAuthentication = (
  payload: any
): ThreeDSAuthentication =>
  ({
    id: payload.data.id,
    state: payload.data.state,
    origin: payload.data.origin,
    ...(payload.data.device_fingerprint !== undefined
      ? {
          deviceFingerprint: parseThreeDSAction(
            payload.data.device_fingerprint
          ),
        }
      : {}),
    ...(payload.data.challenge !== undefined
      ? {
          challenge: parseThreeDSAction(payload.data.challenge),
        }
      : {}),

    // TODO:
  } as ThreeDSAuthentication);

export const parseTransfer = (payload: any): Transfer =>
  ({
    id: payload.data.id,
    state: payload.data.state,
  } as Transfer);
