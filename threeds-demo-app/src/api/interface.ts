export interface Address {
  readonly name: string;
  readonly address1: string;
  readonly address2: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly postalCode: string;
}

export interface CreateCardRequest {
  readonly name: string;
  readonly number: string;
  readonly expMonth: number;
  readonly expYear: number;
  readonly cvc: string;
  readonly billingAddress: Address;
}

export interface Card {
  readonly id: string;
}

export interface BrowserInfo {
  readonly colorDepth: number;
  readonly javaEnabled: boolean;
  readonly language: string;
  readonly screenHeight: number;
  readonly screenWidth: number;
  readonly timeZoneOffset: number;
  readonly userAgent: string;
}

export interface CreateThreeDSAuthenticationRequest {
  readonly card: string;
  readonly amount: number;
  readonly currency: string;
  readonly origin: string;
  readonly browserInfo: BrowserInfo;
}

export interface ThreeDSAction {
  readonly url: string;
  readonly params: Record<string, string>;
  readonly waitForMessage: boolean;
}

export interface ThreeDSAuthentication {
  readonly id: string;
  readonly state: string;
  readonly origin: string;
  readonly deviceFingerprint?: ThreeDSAction;
  readonly challenge?: ThreeDSAction;
}

export interface CreateTransferRequest {
  readonly amount: number;
  readonly currency: string;
  readonly source: string;
  readonly threeDSAuthentication: string;
}

export interface Transfer {
  readonly id: string;
  readonly state: string;
}

export default interface APIInterface {
  /**
   * Create Credit Card
   * @param request request for creating credit card
   */
  createCard(request: CreateCardRequest): Promise<Card>;

  /**
   * Create 3DS authentication
   * @param request request of 3DS authentication
   */
  createThreeDSAuthentication(
    request: CreateThreeDSAuthenticationRequest
  ): Promise<ThreeDSAuthentication>;

  /**
   * Finish device fingerprint step
   * @param id id of 3DS authentication
   * @param completeIndicator is the iframe loading finished?
   */
  finishDeviceFingerprint(
    id: string,
    completeIndicator: boolean
  ): Promise<ThreeDSAuthentication>;

  /**
   * Finish challenge step
   * @param id id of 3DS authentication
   * @param transStatus the status of transaction
   */
  finishChallenge(
    id: string,
    transStatus: string
  ): Promise<ThreeDSAuthentication>;

  /**
   * Create transfer
   * @param request request for creating transfer
   */
  createTransfer(request: CreateTransferRequest): Promise<Transfer>;
}
