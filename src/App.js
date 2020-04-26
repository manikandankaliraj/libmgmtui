import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import BookForm from "./components/bookForm";
import Libraries from "./components/libraries";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/books/:id" component={BookForm} />
          <Route path="/books/new" component={BookForm} />
          <Route path="/libraries" component={Libraries} />} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/libraries" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
