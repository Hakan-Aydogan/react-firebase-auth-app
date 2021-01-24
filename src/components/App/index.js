import React, { useState, useEffect } from "react";

import HomePage from "../HomePage";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "../Firebase";

const theme = createMuiTheme();

export default function App(props) {
  const { classes } = props;
  const [firebaseState, setFireBaseState] = useState();
  useEffect(() => {
    firebase.checkFirebaseState().then((value) => {
      console.log(value);
      setFireBaseState(value);
      // props.history.replace("/dashboard");
    });
  });
  return firebaseState !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}
