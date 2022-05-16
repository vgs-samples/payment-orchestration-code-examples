import React, { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface ThreeDSAuthenticationPayload {
  readonly amount: string;
  readonly currency: string;
}

export interface Props {
  readonly cardId?: string;
  readonly onCardIdChange?: (cardId: string) => void;
  readonly onSubmit?: (payload: ThreeDSAuthenticationPayload) => void;
}

const ThreeDSAuthenticationForm: FunctionComponent<Props> = ({
  cardId,
  onCardIdChange,
  onSubmit,
}) => {
  const [payload, setPayload] = useState<ThreeDSAuthenticationPayload>({
    amount: "1000",
    currency: "USD",
  });

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Card Financial Instrument ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Card Financial Instrument ID"
          value={cardId}
          onChange={(event) => onCardIdChange?.(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="text"
          placeholder="Amount"
          value={payload.amount}
          onChange={(event) =>
            setPayload({ ...payload, amount: event.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          type="text"
          placeholder="Currency"
          value={payload.currency}
          onChange={(event) =>
            setPayload({ ...payload, currency: event.target.value })
          }
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => {
          onSubmit?.(payload);
          event.preventDefault();
          return false;
        }}
      >
        Create
      </Button>
    </Form>
  );
};

export default ThreeDSAuthenticationForm;
