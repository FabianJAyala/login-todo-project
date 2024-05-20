import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function FormTemplate({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                await auth();
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                {loading ? (
                    <Spinner className="mt-3 mb-3" animation="border" variant="primary" align="center" />
                ) : (
                    <Col md={4}>
                        <Form onSubmit={handleSubmit}>
                            <h1 className="mb-5">{name} Form</h1>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                            <Form.Control
                                className="mb-3"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <Button variant="primary" type="submit">
                                {name}
                            </Button>
                        </Form>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default FormTemplate;