import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS, DELETE_USER } from "../graphql.js";
import { Table, Button, Spinner, Card, Badge } from "react-bootstrap";
import { FaTrash, FaUser, FaBuilding } from "react-icons/fa";

export default function UsersList() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger mt-4">
        <p>⚠️ Error loading users</p>
      </div>
    );

  return (
    <Card className="shadow-sm border-0 mt-4">
      <Card.Header className="bg-dark text-light d-flex justify-content-between align-items-center">
        <h5 className="m-0 d-flex align-items-center gap-2">
          <FaUser /> Users List
        </h5>
        <Badge bg="primary">{data?.users?.length || 0}</Badge>
      </Card.Header>

      <Card.Body className="p-0">
        <Table hover responsive className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Company</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td className="fw-semibold">{user.firstName}</td>
                <td>{user.age}</td>
                <td>
                  {user.company ? (
                    <span className="d-flex align-items-center gap-1">
                      <FaBuilding className="text-secondary" />
                      {user.company.name}
                    </span>
                  ) : (
                    <Badge bg="secondary">N/A</Badge>
                  )}
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="d-flex align-items-center gap-1"
                    onClick={() =>
                      deleteUser({ variables: { id: user.id } })
                    }
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
