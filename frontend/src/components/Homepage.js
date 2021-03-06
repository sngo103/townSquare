import React, { useState } from 'react';
import { Grommet, Box, Clock, Calendar, Button, Heading, Text, Collapsible, ResponsiveContext, Layer } from 'grommet';
import { Notification, FormClose } from 'grommet-icons';
//import Welcome from "./components/Welcome.js";
//import Events from "./components/Events.js";
import Events from "./Events.js";

const AppBar = (props) => (//import Events from "./components/Events.js";
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

function Homepage() {
  const [showLayer, setShowLayer] = React.useState(true);

  return (
    <Grommet theme={theme} full>
    <ResponsiveContext.Consumer>
    {size => (
      <Box fill align="center" justify="center">
      <title> Town Square </title>
      <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
        <Events />
        {showLayer && (
          <Layer full animation="fadeIn">
            <Box fill background={{
              color: "accent-2",
              image: "url(https://cdn.hipwallpaper.com/i/50/88/0wlyaU.jpg)"
              }} align="center" justify="center">
              <Box pad="small" background={{ color: "brand" }} elevation="large">
                  town square
              </Box>
              <br/><br/><Box background="light-3" pad="small"> <Text> *Hey everyone, Town Square is undergoing a renovation, so don't be alarmed if some things are falling apart and bear with us. Thanks!
</Text></Box><br />
              <Button
                primary
                color="#B02E52"
                label="What's Goin' On in Town?"
                onClick={() => setShowLayer(false)}
              /><br />
              <Box round="medium" pad="small" background="light-2">
              <Clock hourLimit='12' type="digital" />
              </Box>
              <br />
              <Box round="medium" pad="small" background="light-2">
              <Calendar
              size="small"
              date={(new Date()).toISOString()}
              onSelect={(date) => {}}
              />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>

      </Box>
    )}
    </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default Homepage;
