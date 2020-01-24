import React from 'react';
import { Box, Grommet } from 'grommet';
import Homepage from "./components/Homepage.js";
import Welcome from "./components/Welcome.js";

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Muli',
      size: '100px',
      height: '100px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <header>
      <title> Town Square </title>
      <Welcome />
      <AppBar> Hello World! </AppBar>
      </header>
    </Grommet>
  );
}

export default App;
