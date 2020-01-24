import React, { useState } from 'react';
import { Grommet, Box, Button, Heading, Collapsible } from 'grommet';
import { Notification } from 'grommet-icons';
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
    const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <Box fill>
      <title> Town Square </title>
      <Welcome />
      <AppBar>
      <Heading level='3' margin='none'>My App</Heading>
      <Button
            icon={<Notification />}
            onClick={() => setShowSidebar(!showSidebar)}
       />
      </AppBar>
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
      <Box flex align='center' justify='center'>
        app body
      </Box>
        <Collapsible direction="horizontal" open={showSidebar}>
            <Box
              flex
              width='medium'
              background='light-2'
              elevation='small'
              align='center'
              justify='center'
            >
              sidebar
            </Box>
        </Collapsible>
    </Box>
  </Box>
    </Grommet>
  );
}

export default App;
