import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";

function FormRegister() {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      groups: [],
    });
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/api/groups/')
            .then((res) => {
                setGroups(res.data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGroupChange = e => {
        const { value, checked } = e.target;
        setFormData(prevState => {
            if (checked) {
                return {
                    ...prevState,
                    groups: [...prevState.groups, value]
                };
            } else {
                return {
                    ...prevState,
                    groups: prevState.groups.filter(group => group !== value)
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            await api.post("/api/user/register/", formData);
            navigate("/login");
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
                            <h1 className="mb-5">Register Form</h1>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            <Form.Control
                                className="mb-3"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            <p className="mb-3">Select the groups:</p>
                            {groups.map((group) => (
                              <div key={group.id} className="mb-3">
                                <Form.Check
                                  type="checkbox"
                                  id={group.id}
                                  label={group.name}
                                  value={group.id}
                                  onChange={handleGroupChange}
                                />
                              </div>
                            ))}
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default FormRegister;
