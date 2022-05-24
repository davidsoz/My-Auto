// import Form from 'react-bootstrap/Form';

import { Form } from "react-bootstrap";

function Select({options, onChange, value}) {
  return (
    <Form.Select onChange={onChange} value={value}>
        {
            options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))
        }
    </Form.Select>
  );
}

export default Select;
