import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import HomeView from "./views/index/HomeView";
import AboutView from "./views/index/AboutView";
import NotFoundView from "./views/index/NotFoundView";
import SignInView from "./views/auth/SignInView";
import SignUpView from "./views/auth/SignUpView";
import MyThingsView from "./views/profile/MyThingsView";
import MyBorrowsView from "./views/profile/MyBorrowsView";
import MyHistoryView from "./views/profile/MyHistoryView";
import MyProfileView from "./views/profile/MyProfileView";
import SearchThingsView from "./views/things/SearchThingsView";
import CreateThingView from "./views/things/CreateThingView";
import EditThingView from "./views/things/EditThingView";
import SingleThingView from "./views/things/SingleThingView";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadMe } from "./services/profile";
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

  handleSignOut = async () => {
    try {
      const data = await signOut();
      if (data.signedOut) this.handleUserUpdate(null);
    } catch (error) {
      console.log(error);
    }
  };

  handleUserUpdate = (user) => {
    this.setState({ user });
  };

  handleLocationUpdate = (location) => {
    this.setState({ location });
  };

  handleCoordinatesUpdate = (coordinates) => {
    this.setState({ coordinates });
  };

  handleCategoryUpdate = (category) => {
    this.setState({ category });
  };

  render() {
    return (
      <div id="App">
        <ErrorBoundary>
          <BrowserRouter>
            <Navbar user={this.state.user} handleSignOut={this.handleSignOut} />
            <Switch>
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
              <Route path="/about" render={(props) => <AboutView {...props} user={this.state.user} />} exact />
              <Route
                path="/auth/sign-up"
                render={(props) => <SignUpView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
              />
              <Route
                path="/auth/sign-in"
                render={(props) => <SignInView {...props} handleUserUpdate={this.handleUserUpdate} exact />}
              />
              <ProtectedRoute
                path="/things/create"
                render={(props) => <CreateThingView {...props} coordinates={this.state.coordinates} />}
                authorized={this.state.user}
                redirect="/auth/sign-in"
                exact
              />
              <Route
                path="/things/list"
                render={(props) => (
                  <SearchThingsView
                    {...props}
                    user={this.state.user}
                    location={this.state.location}
                    coordinates={this.state.coordinates}
                    category={this.state.category}
                    exact
                  />
                )}
              />
              <Route
                path="/things/:id/edit"
                render={(props) => <EditThingView {...props} coordinates={this.state.coordinates} exact />}
              />
              <Route
                path="/things/:id"
                render={(props) => <SingleThingView user={this.state.user} {...props} exact />}
              />
              <ProtectedRoute
                path="/profile/borrows"
                render={(props) => (
                  <MyBorrowsView {...props} user={this.state.user} handleUserUpdate={this.handleUserUpdate} exact />
                )}
                authorized={this.state.user}
                redirect="/auth/sign-in"
                exact
              />
              <ProtectedRoute
                path="/profile/things"
                render={(props) => <MyThingsView {...props} user={this.state.user} exact />}
                authorized={this.state.user}
                redirect="/auth/sign-in"
                exact
              />
              <ProtectedRoute
                path="/profile/history"
                render={(props) => <MyHistoryView {...props} user={this.state.user} />}
                authorized={this.state.user}
                redirect="/auth/sign-in"
                exact
              />
              <ProtectedRoute
                path="/profile"
                render={(props) => (
                  <MyProfileView {...props} user={this.state.user} handleUserUpdate={this.handleUserUpdate} />
                )}
                authorized={this.state.user}
                redirect="/auth/sign-in"
                exact
              />
              <Route component={NotFoundView} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
