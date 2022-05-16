import React, { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface CardPayload {
  readonly number: string;
  readonly expMonth: string;
  readonly expYear: string;
  readonly cvc: string;
}

export interface Props {
  readonly initialNumber?: string;
  readonly initialExpMonth?: number;
  readonly initialExpYear?: number;
  readonly initialCVC?: string;
  readonly onSubmit?: (payload: CardPayload) => void;
}

const CardForm: FunctionComponent<Props> = ({
  initialNumber,
  initialExpMonth,
  initialExpYear,
  initialCVC,
  onSubmit,
}) => {
  const [creditCard, setCreditCard] = useState<CardPayload>({
    number: initialNumber ?? "",
    expMonth: initialExpMonth?.toString() ?? "",
    expYear: initialExpYear?.toString() ?? "",
    cvc: initialCVC ?? "",
  });
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Credit Card Number"
          value={creditCard.number}
          onChange={(event) =>
            setCreditCard({ ...creditCard, number: event.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Expiring Month</Form.Label>
        <Form.Control
          type="text"
          placeholder="Expiring Month"
          value={creditCard.expMonth}
          onChange={(event) =>
            setCreditCard({ ...creditCard, expMonth: event.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Expiring Year</Form.Label>
        <Form.Control
          type="text"
          placeholder="Expiring Year"
          value={creditCard.expYear}
          onChange={(event) =>
            setCreditCard({ ...creditCard, expYear: event.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>CVC</Form.Label>
        <Form.Control
          type="text"
          placeholder="CVC"
          value={creditCard.cvc}
          onChange={(event) =>
            setCreditCard({ ...creditCard, cvc: event.target.value })
          }
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => {
          onSubmit?.(creditCard);
          event.preventDefault();
          return false;
        }}
      >
        Create
      </Button>
    </Form>
  );
};

export default CardForm;
