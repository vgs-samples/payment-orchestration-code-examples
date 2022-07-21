import "bootstrap/dist/css/bootstrap.min.css";
import React, { LegacyRef, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { getCurrentAction, performAction } from "./action";
import { ThreeDSAuthentication, Transfer } from "./api/interface";
import { collectBrowserInfo } from "./browserInfo";
import CardForm, { CardPayload } from "./components/CardForm";
import ThreeDSActionForm from "./components/ThreeDSActionForm";
import ThreeDSAuthenticationForm, {
  ThreeDSAuthenticationPayload,
} from "./components/ThreeDSAuthenticationForm";
import TransferForm from "./components/TransferForm";
import { apiClient } from "./shared";

function App() {
  const [cardId, setCardId] = useState<string>("");
  const [threeDSAuthentication, setThreeDSAuthentication] = useState<
    ThreeDSAuthentication | undefined
  >(undefined);
  const [authInfo, setAuthInfo] = useState<{
    amount: number;
    currency: string;
  }>({
    amount: 0,
    currency: "USD",
  });
  const [transfer, setTransfer] = useState<Transfer | undefined>(undefined);
  const iframeContainer = useRef<HTMLDivElement>();

  const createCreditCard = async (payload: CardPayload) => {
    const card = await apiClient.createCard({
      name: "Jane Doe",
      number: payload.number,
      expMonth: parseInt(payload.expMonth),
      expYear: parseInt(payload.expYear),
      cvc: payload.cvc,
      billingAddress: {
        name: "John Doe",
        address1: "555 Unblock Us St",
        address2: "M13 9PL",
        city: "New York",
        region: "NY",
        country: "US",
        postalCode: "12301",
      },
    });
    setCardId(card.id);
  };

  const createThreeDSAuthentication = async (
    payload: ThreeDSAuthenticationPayload
  ) => {
    const threeDSAuthentication = await apiClient.createThreeDSAuthentication({
      card: cardId,
      amount: parseInt(payload.amount),
      currency: payload.currency,
      origin: window.location.origin,
      browserInfo: collectBrowserInfo(),
    });
    setAuthInfo({
      amount: parseInt(payload.amount),
      currency: payload.currency,
    });
    setThreeDSAuthentication(threeDSAuthentication);
  };

  const performActionStep = async () => {
    if (threeDSAuthentication === undefined) {
      return;
    }
    const resp = await performAction(threeDSAuthentication, {
      apiClient,
      iframeContainer: iframeContainer.current!,
      origin: "http://localhost:8080",
      decorateIframe: (iframe) => {
        iframe.style.width = "100%";
        iframe.style.height = "550px";
      },
    });
    setThreeDSAuthentication(resp);
  };

  const createTransfer = async () => {
    if (threeDSAuthentication?.state !== "successful") {
      return;
    }
    const resp = await apiClient.createTransfer({
      amount: authInfo.amount,
      currency: authInfo.currency,
      source: cardId,
      threeDSAuthentication: threeDSAuthentication.id,
    });
    setTransfer(resp);
  };

  return (
    <Container className="my-3">
      <Row>
        <Col>
          <h2>Step 1. Create Credit Card</h2>
          <CardForm
            initialNumber="4917610000000000"
            initialExpMonth={3}
            initialExpYear={2030}
            initialCVC="737"
            onSubmit={createCreditCard}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h2>Step 2. Create 3DS authentication</h2>
          <ThreeDSAuthenticationForm
            cardId={cardId}
            onCardIdChange={(value) => setCardId(value)}
            onSubmit={createThreeDSAuthentication}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h2>Step 3. Device Fingerprint and Challenge</h2>
          <ThreeDSActionForm
            threeDSAuthenticationId={threeDSAuthentication?.id ?? ""}
            state={threeDSAuthentication?.state ?? ""}
            actionUrl={
              threeDSAuthentication !== undefined
                ? getCurrentAction(threeDSAuthentication)?.url
                : undefined
            }
            actionParams={
              threeDSAuthentication !== undefined
                ? getCurrentAction(threeDSAuthentication)?.params
                : undefined
            }
            actionWaitForMessage={
              threeDSAuthentication !== undefined
                ? getCurrentAction(threeDSAuthentication)?.waitForMessage
                : undefined
            }
            onSubmit={performActionStep}
          />

          <h3>Action iframe:</h3>
          <div ref={iframeContainer as LegacyRef<HTMLDivElement>}></div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h2>Step 4. Create a transfer with 3DS authentication</h2>
          <TransferForm onSubmit={createTransfer} />

          <h3>Result:</h3>
          <Form.Group className="mb-3">
            <Form.Label>Transfer ID</Form.Label>
            <Form.Control type="text" value={transfer?.id ?? ""} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transfer State</Form.Label>
            <Form.Control type="text" value={transfer?.state ?? ""} readOnly />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
