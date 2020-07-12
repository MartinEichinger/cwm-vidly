import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import * as authService from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar className="mt-0 pt-0" user={this.state.user} />
        <main className="container mt-4">
          <div className="content">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={this.state.user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Movies} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

//<Route
//path="/customers"
//render={(props) => <Products sortBy="newest" {...props} />}
///>
