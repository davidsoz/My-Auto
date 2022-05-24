import { FormControl, InputGroup } from "react-bootstrap";

function Input({placeholder}) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={placeholder}
      />
    </InputGroup>
  );
}

export default Input;
