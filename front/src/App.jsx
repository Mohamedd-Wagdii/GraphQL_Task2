import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UsersList from "./components/UsersList";
import AddUserForm from "./components/AddUserForm";
import CompaniesList from "./components/CompaniesList";
import AddCompanyForm from "./components/AddCompanyForm";

function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Dashboard Header */}
      <header className="py-4 mb-4 bg-primary text-white shadow-sm">
        <Container>
          <h2 className="fw-bold text-center mb-0">
            GraphQL Admin Dashboard
          </h2>
          <p className="text-center text-light mb-0">
            Manage Users & Companies effortlessly
          </p>
        </Container>
      </header>

      {/* Main Content */}
      <Container>
        <Row className="g-4">
          {/* Users Section */}
          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body>
                <h4 className="fw-bold text-primary mb-3 border-bottom pb-2">
                  👤 Users Management
                </h4>
                <AddUserForm />
                <div
                  style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  <UsersList />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Companies Section */}
          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4 h-100">
              <Card.Body>
                <h4 className="fw-bold text-success mb-3 border-bottom pb-2">
                  🏢 Company Management
                </h4>
                <AddCompanyForm />
                <div
                  style={{
                    maxHeight: "60vh",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  <CompaniesList />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center py-3 mt-4 text-muted small">
        © {new Date().getFullYear()} Apollo GraphQL Dashboard
      </footer>
    </div>
  );
}

export default App;
