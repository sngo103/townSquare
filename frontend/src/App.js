import React, { Component, useState } from 'react';
import { Grommet, Box, Button, Heading, Collapsible, ResponsiveContext, Layer } from 'grommet';
import { Notification, FormClose } from 'grommet-icons';
import Homepage from "./components/Homepage.js";
import Welcome from "./components/Welcome.js";
import Events from "./components/Events.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/events" exact component={Events} />
      </Router>
    );
  }
}

export default App;
