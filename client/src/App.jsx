import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import HomeView from "./views/HomeView/HomeView";
import SignInView from "./views/SignInView/SignInView";
import SignUpView from "./views/SignUpView/SignUpView";
import ProfileView from "./views/ProfileView/ProfileView";
import EditProfileView from "./views/EditProfileView/EditProfileView";
import ListThingsView from "./views/ListThingsView/ListThingsView";
import CreateThingView from "./views/CreateThingView/CreateThingView";
import Navbar from "./components/Navbar/Navbar";
import { loadMe } from "./services/auth";
import { signOut } from "./services/auth";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      coordinates: [],
      category: null
    };
  }

  componentDidMount() {
    this.getUserLocation();
    loadMe()
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

  handleLocationUpdate = (coordinates) => {
    this.setState({
      coordinates
    });
  };

  handleCategoryUpdate = (category) => {
    this.setState({
      category
    });
  };

  getUserLocation() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = [position.coords.longitude, position.coords.latitude];
        this.handleLocationUpdate(coordinates);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar user={this.state.user} handleSignOut={this.handleSignOut} />
          <Switch>
            <Route
              path="/auth/sign-up"
              render={(props) => <SignUpView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
            />
            <Route
              path="/auth/sign-in"
              render={(props) => <SignInView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
            />
            <Route
              path="/things/create"
              render={(props) => <CreateThingView {...props} coordinates={this.state.coordinates} exact />}
            />
            <Route
              path="/things/list"
              render={(props) => (
                <ListThingsView {...props} coordinates={this.state.coordinates} category={this.state.category} exact />
              )}
            />
            <Route path="/profile" render={(props) => <ProfileView {...props} exact />} />
            <Route path="/profile/edit" render={(props) => <EditProfileView {...props} exact />} />
            <Route
              path="/"
              render={(props) => (
                <HomeView
                  {...props}
                  handleLocation={this.handleLocationUpdate}
                  handleCategory={this.handleCategoryUpdate}
                  exact
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
