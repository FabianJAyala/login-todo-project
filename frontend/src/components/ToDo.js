import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function ToDo({ toDo, onDelete, onUpdate }) {
  return (
    <Container className="mt-2 mb-2">
      <Row className="justify-content-center">
        <Col sm={2}>
          <Form.Check
            type="switch"
            checked={toDo.complete}
            onChange={() => onUpdate(toDo)}
          />
        </Col>
        <Col sm={6} align="left">
          <Button variant={ toDo.complete ? "success" : "secondary" }>
            {toDo.title}: {toDo.content}
          </Button>
        </Col>
        <Col sm={4}>
          <Button variant="danger" onClick={() => onDelete(toDo.id)}>Delete</Button>
        </Col>
      </Row>
    </Container>
  )
}
