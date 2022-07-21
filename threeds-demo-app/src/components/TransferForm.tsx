import React, { FunctionComponent } from "react";
import { Button, Form } from "react-bootstrap";

export interface Props {
  readonly onSubmit?: () => void;
}

const TransferForm: FunctionComponent<Props> = ({ onSubmit }) => {
  return (
    <Form>
      <Button
        variant="primary"
        type="submit"
        onClick={(event) => {
          onSubmit?.();
          event.preventDefault();
          return false;
        }}
      >
        Create
      </Button>
    </Form>
  );
};

export default TransferForm;
