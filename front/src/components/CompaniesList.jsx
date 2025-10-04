import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_COMPANIES } from "../graphql.js";
import {
  Card,
  Spinner,
  Badge,
  ListGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

export default function CompaniesList() {
  const { data, loading, error } = useQuery(GET_COMPANIES);

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="text-center mt-4">
        ❌ Error loading companies.
      </Alert>
    );

  return (
    <div className="p-3">
      <h4 className="mb-4 fw-bold text-primary border-bottom pb-2">
        Company Directory
      </h4>

      <Row xs={1} md={2} lg={3} className="g-4">
        {data.companies.map((company) => (
          <Col key={company.id}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold text-dark">
                    {company.name}
                  </span>
                  <Badge bg="info" text="dark">
                    {company.users.length} Users
                  </Badge>
                </Card.Title>
                <Card.Subtitle className="text-muted small mb-3">
                  {company.slogan || "No slogan available"}
                </Card.Subtitle>

                <ListGroup variant="flush">
                  {company.users.length > 0 ? (
                    company.users.map((u) => (
                      <ListGroup.Item
                        key={u.id}
                        className="d-flex justify-content-between align-items-center px-0 border-0 border-bottom"
                      >
                        <span>{u.firstName}</span>
                        <Badge bg="light" text="dark">
                          ID: {u.id}
                        </Badge>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item className="text-muted fst-italic px-0">
                      No users in this company
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
