import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Add .jsx extension
import { ApolloProvider } from "@apollo/client/react"; // Correct import path
import client from "./apolloClient.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
