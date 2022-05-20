import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/ApolloClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import pagesRoutes from "./routing/routes";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import { Box } from "@mui/system";

export default function App() {
  const [name, setName] = useState("");
  return (
    <ApolloProvider client={client}>
      <Navbar setName={setName} name={name} />
      <BrowserRouter>
        <Routes>
          {pagesRoutes.map((item) => (
            <Route path={item.link} element={<item.component name={name} />} />
          ))}
        </Routes>
      </BrowserRouter>
      <footer>
        <Footer />
      </footer>
    </ApolloProvider>
  );
}
