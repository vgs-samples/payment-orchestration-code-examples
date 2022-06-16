import APIInterface, {
  Card,
  CreateCardRequest,
  CreateThreeDSAuthenticationRequest,
  CreateTransferRequest,
  ThreeDSAuthentication,
  Transfer,
} from "./interface";
import {
  parseCard,
  parseThreeDSAuthentication,
  parseTransfer,
} from "./parsers";

export class TryAgainError extends Error {
  constructor(m: string) {
      super(m);
  }
}

export default class APIClient implements APIInterface {
  private baseURL: string;
  private authToken: string;
  private localServer: boolean;

  constructor(
    baseURL: string,
    authToken: string,
    localServer: boolean = false
  ) {
    this.baseURL = baseURL;
    this.authToken = authToken;
    this.localServer = localServer;
  }

  private commonHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.localServer) {
      headers["X-Auth-Token"] = this.authToken;
    } else {
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async createCard(createRequest: CreateCardRequest): Promise<Card> {
    const url = new URL("/financial_instruments", this.baseURL!);
    const request = new Request(url.href, {
      method: "POST",
      headers: this.commonHeaders(),
      body: JSON.stringify({
        card: {
          name: createRequest.name,
          number: createRequest.number,
          exp_month: createRequest.expMonth,
          exp_year: createRequest.expYear,
          cvc: createRequest.cvc,
          billing_address: {
            name: createRequest.billingAddress.name,
            address1: createRequest.billingAddress.address1,
            address2: createRequest.billingAddress.address2,
            city: createRequest.billingAddress.city,
            region: createRequest.billingAddress.region,
            country: createRequest.billingAddress.country,
            postal_code: createRequest.billingAddress.postalCode,
          },
        },
      }),
    });
    const resp = await fetch(request);
    if (resp.status >= 400) {
      throw new Error(`Bad response status ${resp.status} for create card`);
    }
    const payload = await resp.json();
    return parseCard(payload);
  }

  async createThreeDSAuthentication(
    createRequest: CreateThreeDSAuthenticationRequest
  ): Promise<ThreeDSAuthentication> {
    const url = new URL("/3ds_authentications", this.baseURL!);
    const request = new Request(url.href, {
      method: "POST",
      headers: this.commonHeaders(),
      body: JSON.stringify({
        card: createRequest.card,
        amount: createRequest.amount,
        currency: createRequest.currency,
        origin: createRequest.origin,
        browser_info: {
          java_enabled: createRequest.browserInfo.javaEnabled,
          language: createRequest.browserInfo.language,
          color_depth: createRequest.browserInfo.colorDepth,
          screen_width: createRequest.browserInfo.screenWidth,
          screen_height: createRequest.browserInfo.screenHeight,
          timezone: createRequest.browserInfo.timeZoneOffset,
          user_agent: createRequest.browserInfo.userAgent,
        },
      }),
    });
    const resp = await fetch(request);
    if (resp.status >= 400) {
      throw new Error(`Bad response status ${resp.status} for create 3DS auth`);
    }
    const payload = await resp.json();
    return parseThreeDSAuthentication(payload);
  }

  async finishDeviceFingerprint(
    id: string,
    completeIndicator: boolean
  ): Promise<ThreeDSAuthentication> {
    const url = new URL(
      `/3ds_authentications/${id}/fingerprints`,
      this.baseURL!
    );
    const request = new Request(url.href, {
      method: "POST",
      headers: this.commonHeaders(),
      body: JSON.stringify({
        complete_indicator: completeIndicator ? "Y" : "N",
      }),
    });
    const resp = await fetch(request);
    if (resp.status == 499) {
      throw new TryAgainError('Try again later')
    }
    if (resp.status >= 400) {
      throw new Error(
        `Bad response status ${resp.status} for device fingerprint`
      );
    }
    const payload = await resp.json();
    return parseThreeDSAuthentication(payload);
  }

  async finishChallenge(
    id: string,
    transStatus: string
  ): Promise<ThreeDSAuthentication> {
    const url = new URL(`/3ds_authentications/${id}/challenges`, this.baseURL!);
    const request = new Request(url.href, {
      method: "POST",
      headers: this.commonHeaders(),
      body: JSON.stringify({
        trans_status: transStatus,
      }),
    });
    const resp = await fetch(request);
    if (resp.status == 499) {
      throw new TryAgainError('Try again later')
    }
    if (resp.status >= 400) {
      throw new Error(`Bad response status ${resp.status} for challenge`);
    }
    const payload = await resp.json();
    return parseThreeDSAuthentication(payload);
  }

  async createTransfer(
    createRequest: CreateTransferRequest
  ): Promise<Transfer> {
    const url = new URL("/transfers", this.baseURL!);
    const request = new Request(url.href, {
      method: "POST",
      headers: this.commonHeaders(),
      body: JSON.stringify({
        amount: createRequest.amount,
        currency: createRequest.currency,
        source: createRequest.source,
        three_ds_authentication: createRequest.threeDSAuthentication,
      }),
    });
    const resp = await fetch(request);
    if (resp.status >= 400) {
      throw new Error(`Bad response status ${resp.status} for transfer`);
    }
    const payload = await resp.json();
    return parseTransfer(payload);
  }
}
