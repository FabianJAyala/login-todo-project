import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Container, Col, Row, Spinner } from 'react-bootstrap';
import api from "../api";
import ToDo from '../components/ToDo';

function Home() {

  const [username, setUsername] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [toDoTitle, setToDoTitle] = useState("");
  const [toDoContent, setToDoContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getCurrentUser();
    getToDos();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getToDos();
  }, [filter]);

  const getCurrentUser = () => {
    api.get("/api/users/current/")
    .then((res) => res.data)
    .then((data) => {
      setUsername(data.username);
    })
    .catch((err) => alert(err));
  };

  const getToDos = () => {
    setIsLoading(true);
    const filterQuery = filter === "all" ? "" : `?complete=${filter}`;
    api.get(`/api/todos/${filterQuery}`)
      .then((res) => res.data)
      .then((data) => {
        setToDoList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  const createToDo = (e) => {
    e.preventDefault();
    api.post("/api/todos/", { "title": toDoTitle, "content": toDoContent })
    .then((res) => {
      if (res.status === 201) alert("To do created!");
      else alert("Failed to add to do.");
      getToDos();
    })
    .catch((err) => alert(err));
  };

  const updateToDo = (toDo) => {
    api.patch(`/api/todos/${toDo.id}/`, { "complete": !toDo.complete })
    .then((res) => {
      /* if (res.status === 200) alert("To do updated!");
      else alert("Failed to update to do."); */
      getToDos();
    })
    .catch((err) => alert(err));
  };

  const deleteToDo = (id) => {
    api.delete(`/api/todos/delete/${id}/`)
    .then((res) => {
      if (res.status === 204) alert("To do deleted!");
      else alert("Failed to delete to do.");
      getToDos();
    })
    .catch((err) => alert(err));
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="mt-5 mb-5" align="center">Welcome back {username}</h1>
      <Row className="justify-content-center">
        <Col sm={4}>
          <h2 className="mb-3">Add Todo</h2>
          <Form onSubmit={createToDo}>
            <Form.Group className="mb-3" controlId="formToDoTitle">
              <Form.Control type="text" placeholder="To do title..." value={toDoTitle} onChange={e => setToDoTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formToDoContent">
              <Form.Control type="text" placeholder="To do content..." value={toDoContent} onChange={e => setToDoContent(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center" align="center">
        <Col sm={6}>
          <h2 className="mt-5 mb-3">Your to do list</h2>
          <Form.Select style={{ maxWidth: "40%" }} className="mb-5" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="true">Completed</option>
            <option value="false">In Progress</option>
          </Form.Select>
          {isLoading ? (
            <Spinner className="mt-3 mb-3" size="lg" animation="border" variant="primary" align="center" />
          ) : (
            <h3>{toDoList.map((toDo, index) =>
              <ToDo key={index} toDo={toDo} onDelete={deleteToDo} onUpdate={updateToDo} />
            )}</h3>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home;