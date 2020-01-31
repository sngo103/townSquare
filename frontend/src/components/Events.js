import React, { Component, useState } from 'react';
import { grommet } from "grommet/themes";
import { Grommet, Box, Button, Heading, Collapsible, ResponsiveContext, Layer, Accordion, AccordionPanel, Text, ThemeContext, Select, TextInput } from 'grommet';
import { Hide, View, Notification, FormClose, Bookmark, CircleInformation, FormSubtract, FormAdd, User, Vmware, Gamepad, Group, Html5, Linkedin, Instagram } from 'grommet-icons';
import EventsList from './EventsList.js'

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

const richAccordionTheme = {
  accordion: {
    icons: {
      collapse: FormSubtract,
      expand: FormAdd
    }
  }
};

const RichPanel = ({ children, icon, label }) => {
  const [hovering, setHovering] = React.useState(false);

  const renderPanelTitle = () => (
    <Box
      direction="row"
      align="center"
      gap="small"
      pad={{ horizontal: "small" }}
    >
      {icon}
      <Heading level={4} color={hovering ? "dark-1" : "dark-3"}>
        {label}
      </Heading>
    </Box>
  );

  return (
    <AccordionPanel
      label={renderPanelTitle()}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      {children}
    </AccordionPanel>
  );
};

const spinning = (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width="32px"
    height="32px"
    fill="#333333"
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28
      A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const loading = (
  <Box align="center" justify="center" style={{ height: "100px" }}>
    {spinning}
  </Box>
);

function Events() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);
  const [open, setOpen] = React.useState();
  const [value, setValue] = React.useState('');
  const [loggingIn, setLoggingIn] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(undefined);
  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(undefined);
    setErrMsg(undefined);
  };
  const sendLogin = () => {
    setLoggingIn(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: value,
        password: passValue
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onClose();
        } else {
          setErrMsg(data.message);
        }
      })
      .catch(err => {
        //console.log(`Failed to login: ${err}`);
        setErrMsg('Failed to login.');
      })
      .finally(() => setLoggingIn(false));
  };
  const [passValue, passSetValue] = React.useState("");
  const [reveal, setReveal] = React.useState(false);

    return (
      <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
        <title> Town Square </title>
        <AppBar>
        <Button
        icon={<Vmware />}
        onClick={() => setShowSidebar(!showSidebar)}
        />
        <Box width='medium' color="#454353" background="#eb4034" elevation='xlarge' align='center' justify='center'>
          town square
        </Box>
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
          <Box
          width='small'
          background='#f0b1ad'
          elevation='small'
          align='center'
          justify='center'
          >
      <Box fill background="light-2" align="center" justify="center">
      <Text align="center" justify="center">
        <strong>To see your saved events,</strong>
      </Text>
        <Button
          label={
            <Text>
              <strong>Login</strong>
            </Text>
          }
          onClick={onOpen}
          plain
        />
      </Box>
      {open && (
        <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Login
            </Heading>
            <Text color="status-critical">{ errMsg }</Text>
            <Text>email: <TextInput
            placeholder="email@townsquare.com"
            value={value}
            onChange={event => setValue(event.target.value)}
            /></Text>
            <Text>password:
            <Box
            width="medium"
            direction="row"
            round="small"
            border
            >
            <TextInput
            plain
            type={reveal ? "text" : "password"}
            value={passValue}
            onChange={event => passSetValue(event.target.value)}
            />
            <Button
            icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
            onClick={() => setReveal(!reveal)}
            />
            </Box>
            </Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label={
                  <Text color="white">
                    <strong>Login</strong>
                  </Text>
                }
                disabled={loggingIn}
                onClick={sendLogin}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
        </Box>
        <Box fill align='center' justify='center'>
        <Box fill direction="row">
          <ThemeContext.Extend value={richAccordionTheme}>
            <EventsList />
          </ThemeContext.Extend>

      </Box>
        </Box>
        </Box>
        </Box>
      )}
      </ResponsiveContext.Consumer>
      </Grommet>
    );
}

export default Events;
