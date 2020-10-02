import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HomeView from "./views/index/HomeView";
import SignInView from "./views/auth/SignInView";
import SignUpView from "./views/auth/SignUpView";
import ProfileView from "./views/profile/ProfileView";
import MyHistoryView from "./views/profile/MyHistoryView";
import MyThingsView from "./views/profile/MyThingsView";
import ListThingsView from "./views/things/ListThingsView";
import SingleThingView from "./views/things/SingleThingView";
import CreateThingView from "./views/things/CreateThingView";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadMe } from "./services/auth";
import { signOut } from "./services/auth";
import { getUserCoordinates } from "./services/geocoder";
import { getUserLocation } from "./services/geocoder";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      location: "",
      coordinates: [],
      category: ""
    };
  }

  componentDidMount() {
    getUserCoordinates()
      .then((data) => {
        const lng = data.coords.longitude;
        const lat = data.coords.latitude;
        const coordinates = [lng, lat];
        this.handleCoordinatesUpdate(coordinates);
        return getUserLocation(coordinates);
      })
      .then((data) => {
        const location = data.results[0].address_components[2].long_name;
        this.handleLocationUpdate(location);
        return loadMe();
      })
      .then((data) => {
        const user = data.user;
        this.handleUserUpdate(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleUserUpdate = (user) => {
    this.setState({
      user
    });
  };

  handleSignOut = () => {
    signOut()
      .then(() => {
        this.handleUserUpdate(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleLocationUpdate = (location) => {
    this.setState({
      location
    });
  };

  handleCoordinatesUpdate = (coordinates) => {
    this.setState({
      coordinates
    });
  };

  handleCategoryUpdate = (category) => {
    this.setState({
      category
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} handleSignOut={this.handleSignOut} />
          <Switch>
            <ProtectedRoute
              path="/things/create"
              render={(props) => <CreateThingView {...props} coordinates={this.state.coordinates} />}
              authorized={this.state.user}
              redirect="/auth/sign-in"
              exact
            />
            <Route
              path="/"
              render={(props) => (
                <HomeView
                  {...props}
                  handleCoordinatesUpdate={this.handleCoordinatesUpdate}
                  handleLocationUpdate={this.handleLocationUpdate}
                  handleCategoryUpdate={this.handleCategoryUpdate}
                />
              )}
              exact
            />
            <Route
              path="/auth/sign-up"
              render={(props) => <SignUpView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
            />
            <Route
              path="/auth/sign-in"
              render={(props) => <SignInView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
            />
            <Route
              path="/things/list"
              render={(props) => (
                <ListThingsView
                  {...props}
                  location={this.state.location}
                  coordinates={this.state.coordinates}
                  category={this.state.category}
                  exact
                />
              )}
            />
            <Route path="/things/:id" render={(props) => <SingleThingView {...props} exact />} />
            <ProtectedRoute
              path="/profile"
              render={(props) => (
                <ProfileView {...props} user={this.state.user} handleUserUpdate={this.handleUserUpdate} />
              )}
              authorized={this.state.user}
              redirect="auth/sign-in"
              exact
            />
            <ProtectedRoute
              path="/profile/history"
              render={(props) => <MyHistoryView {...props} user={this.state.user} />}
              authorized={this.state.user}
              redirect="auth/sign-in"
              exact
            />
            <ProtectedRoute
              path="/profile/things"
              render={(props) => <MyThingsView {...props} user={this.state.user} exact />}
              authorized={this.state.user}
              redirect="auth/sign-in"
              exact
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
