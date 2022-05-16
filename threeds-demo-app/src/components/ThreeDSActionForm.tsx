import React, { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface Props {
  readonly threeDSAuthenticationId?: string;
  readonly state: string;
  readonly actionUrl?: string;
  readonly actionParams?: Record<string, string>;
  readonly actionWaitForMessage?: boolean;
  readonly onSubmit?: () => void;
}

const ThreeDSActionForm: FunctionComponent<Props> = ({
  threeDSAuthenticationId,
  state,
  actionUrl,
  actionParams,
  actionWaitForMessage,
  onSubmit,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Three DS Authentication ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Three DS Authentication ID"
          value={threeDSAuthenticationId}
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" value={state} readOnly />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action URL</Form.Label>
        <Form.Control type="text" value={actionUrl} readOnly />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action params</Form.Label>
        <Form.Control
          type="text"
          value={
            actionParams !== undefined
              ? JSON.stringify(actionParams)
              : undefined
          }
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Action Wait For Message</Form.Label>
        <Form.Control
          type="text"
          value={actionWaitForMessage?.toString() ?? ""}
          readOnly
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={(event) => {
          onSubmit?.();
          event.preventDefault();
          return false;
        }}
      >
        Perform
      </Button>
    </Form>
  );
};

export default ThreeDSActionForm;
