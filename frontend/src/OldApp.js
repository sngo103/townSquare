import React, { useState } from 'react';
import { Grommet, Box, Button, Heading, Collapsible, ResponsiveContext, Layer } from 'grommet';
import { Notification, FormClose } from 'grommet-icons';
import Homepage from "./components/Homepage.js";
import Welcome from "./components/Welcome.js";
import Events from "./components/Events.js";

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
      brand: '#cf4658',
    },
    font: {
      family: 'Muli',
      size: '50px',
      height: '50px',
    },
  },
};

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
    {size => (
      <Box fill>
      <title> Town Square </title>
      <Welcome />
      <AppBar>
      <Button
      icon={<Notification />}
      onClick={() => setShowSidebar(!showSidebar)}
      />
      </AppBar>
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
      {(!showSidebar || size !== 'small') ? (
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
      ): (
        <Layer>
        <Box
        background='light-2'
        tag='header'
        justify='end'
        align='center'
        direction='row'
        >
        <Button
        icon={<FormClose />}
        onClick={() => setShowSidebar(false)}
        />
        </Box>
        <Box
        fill
        background='light-2'
        align='center'
        justify='center'
        >
        sidebar
        </Box>
        </Layer>
      )}
      <Box flex align='center' justify='center'>
      app body
      </Box>
      </Box>
      </Box>
    )}
    </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
