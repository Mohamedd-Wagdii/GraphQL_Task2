import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_COMPANY, GET_COMPANIES } from "../graphql.js";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { FaBuilding, FaQuoteRight } from "react-icons/fa";

export default function AddCompanyForm() {
  const [form, setForm] = useState({ name: "", slogan: "" });

  const [addCompany, { loading }] = useMutation(ADD_COMPANY, {
    refetchQueries: [{ query: GET_COMPANIES }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCompany({
      variables: { name: form.name, slogan: form.slogan },
    });
    setForm({ name: "", slogan: "" });
  };

  return (
    <Card className="p-4 mb-3 shadow-sm border-0 rounded-4">
      <h5 className="fw-bold mb-3 text-success border-bottom pb-2">
        🏢 Add New Company
      </h5>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">
            <FaBuilding className="me-2 text-secondary" />
            Company Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-3 shadow-sm"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">
            <FaQuoteRight className="me-2 text-secondary" />
            Slogan
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company slogan"
            value={form.slogan}
            onChange={(e) => setForm({ ...form, slogan: e.target.value })}
            required
            className="rounded-3 shadow-sm"
          />
        </Form.Group>

        <div className="text-end">
          <Button
            type="submit"
            variant="success"
            className="px-4 rounded-3 shadow-sm"
            disabled={loading}
          >
            {loading ? (
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
              "Add Company"
            )}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
