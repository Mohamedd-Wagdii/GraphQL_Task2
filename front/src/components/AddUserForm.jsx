import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { ADD_USER, GET_USERS, GET_COMPANIES } from "../graphql.js";
import { Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { FaUser, FaBuilding, FaHashtag } from "react-icons/fa";

export default function AddUserForm() {
  const [form, setForm] = useState({ firstName: "", age: "", companyId: "" });
  const { data: companiesData, loading: loadingCompanies } = useQuery(GET_COMPANIES);

  const [addUser, { loading: adding }] = useMutation(ADD_USER, {
    refetchQueries: [
      { query: GET_USERS },
      { query: GET_COMPANIES },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({
      variables: {
        firstName: form.firstName,
        age: parseInt(form.age),
        companyId: form.companyId || null,
      },
    });
    setForm({ firstName: "", age: "", companyId: "" });
  };

  return (
    <Card className="p-4 shadow-sm border-0 rounded-4">
      <h5 className="fw-bold mb-3 text-primary border-bottom pb-2">
        ➕ Add New User
      </h5>

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                <FaUser className="me-2 text-secondary" />
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
                className="rounded-3"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                <FaHashtag className="me-2 text-secondary" />
                Age
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
                className="rounded-3"
              />
            </Form.Group>
          </Col>

          <Col xs={12}>
            <Form.Group>
              <Form.Label className="fw-semibold">
                <FaBuilding className="me-2 text-secondary" />
                Company
              </Form.Label>
              <Form.Select
                value={form.companyId}
                onChange={(e) => setForm({ ...form, companyId: e.target.value })}
                className="rounded-3"
              >
                <option value="">Select Company</option>
                {loadingCompanies ? (
                  <option disabled>Loading companies...</option>
                ) : (
                  companiesData?.companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end mt-4">
          <Button
            type="submit"
            variant="primary"
            className="px-4 rounded-3 shadow-sm"
            disabled={adding}
          >
            {adding ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              "Add User"
            )}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
