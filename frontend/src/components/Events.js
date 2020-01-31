import React, { Component, useState } from 'react';
import { grommet } from "grommet/themes";
import { Grommet, Box, Button, Heading, Collapsible, ResponsiveContext, Form, Nav, FormField, Layer, Accordion, AccordionPanel, Text, ThemeContext, Select, TextInput } from 'grommet';
import { Hide, View, Notification, FormClose, Bookmark, CircleInformation, FormSubtract, FormAdd, Grow, Favorite, Gremlin, Edit, User, Home, Gamepad, Group, Html5, Linkedin, Instagram } from 'grommet-icons';
import EventsList from './EventsList.js'
import SavedList from './SavedList.js'
import CreateEvent from './CreateEvent.js'
import MyEvents from './MyEvents.js'
import MyProfile from './MyProfile.js'

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

const formtheme = {
  global: {
    colors: {
      brand: '#cf4658',
    },
    font: {
      family: 'Muli',
      size: '12px',
      height: '12px',
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
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showMasterList, setShowMasterList] = useState(true);
  const [showSavedList, setShowSavedList] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showMyEvents, setShowMyEvents] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState();
  const [openRegister, setOpenRegister] = React.useState();
  const [email, setEmail] = React.useState('');
  const [fname, setFname] = React.useState('');
  const [lname, setLname] = React.useState('');
  const [passValue, passSetValue] = React.useState('');
  const [confirmPassValue, confirmPassSetValue] = React.useState('');
  const [revealPass, setRevealPass] = React.useState(false);
  const [revealCPass, setRevealCPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(undefined);

  const sendLogin = () => {
    setLoading(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: passValue
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onLoginClose();
          setUserLoggedIn(true)
        } else {
          setErrMsg(data.message);
        }
      })
      .catch(err => {
        //console.log(`Failed to login: ${err}`);
        setErrMsg('Failed to login.');
      })
      .finally(() => setLoading(false));
  };
  const onLoginOpen = () => setOpenLogin(true);
  const onLoginClose  = () => {
    setOpenLogin(undefined);
    setErrMsg(undefined);
  };
  const logout = () => {
    fetch('/api/logout', {
      method: 'POST'
    }).then(() => setUserLoggedIn(false));
  }
  const sendRegister = () => {
    setLoading(true);
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: passValue,
        confirmPassword: confirmPassValue
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onRegisterClose();
        } else {
          setErrMsg(data.message);
        }
      })
      .catch(err => {
        //console.log(`Failed to register: ${err}`);
        setErrMsg('Failed to register.');
      })
      .finally(() => setLoading(false));
  };
  const onRegisterOpen = () => setOpenRegister(true);
  const onRegisterClose  = () => {
    setOpenRegister(undefined);
    setErrMsg(undefined);
  };

    return (
      <Grommet theme={formtheme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
        <title> Town Square </title>
        <AppBar>
        <Button
        icon={<Home />}
        focusIndicator={false}
        onClick={() => { setShowCreateEvent(false); setShowSavedList(false); setShowMasterList(true)}}
        />
        <Box width='medium' color="#454353" background="#eb4034" elevation='xlarge' align='center' justify='center'>
        <Heading level="3" size="small">
        town square
        </Heading>
        </Box>
        {userLoggedIn ?
          <div>
          <Button
          label={
            <Text color="white">
              <strong>Create Event</strong>
            </Text>
          }
          disabled={loading}
          onClick={() => setShowCreateEvent(true)}
          color="status-critical"
        />&nbsp;&nbsp;
          <Button
          label={
            <Text color="white">
              <strong>Logout</strong>
            </Text>
          }
          disabled={loading}
          onClick={logout}
          primary
          color="status-critical"
        />
        </div> : <div></div>}
        </AppBar>
        <Box direction='row' flex >
        <Box
          width='medium'
          background='#f0b1ad'
          elevation='small'
          align='center'
          justify='center'
        >
      <Box fill background="light-2" align="center" justify="center">
      { userLoggedIn ? <Box align="center" justify="center"><Text><strong> Welcome back, user! </strong></Text><br /><br />
        <Button
          icon={<Group />}
          label="Upcoming Events"
          onClick={() => {setShowMasterList(true);setShowSavedList(false);setShowMyEvents(false);setShowProfile(false)}}
        /><br />
        <Button
          icon={<Favorite />}
          label="My Saved Events"
          onClick={() => {setShowMasterList(false);setShowSavedList(true);setShowMyEvents(false);setShowProfile(false)}}
        /><br />
        <Button
          icon={<Edit />}
          label="Manage My Events"
          onClick={() => {setShowMasterList(false);setShowSavedList(false);setShowMyEvents(true);setShowProfile(false)}}
        /><br />
        <Button
          icon={<Gremlin />}
          label="My Profile"
          onClick={() => {setShowMasterList(false);setShowSavedList(false);setShowMyEvents(false);setShowProfile(true)}}
        />
        </Box> : <Text align="center" justify="center">
        <strong>To see your saved events,<br/>
        <Button
          label={
              <strong>&nbsp;Login&nbsp;</strong>
          }
          onClick={onLoginOpen}
        />
        <br /><br /> OR <br /><br />
        <Button
            label={
                <strong>&nbsp;Create an Account&nbsp;</strong>
            }
            onClick={onRegisterOpen}
          />
          <br />to save your events today.</strong></Text>}
      </Box>
      {openLogin && !openRegister && (
        <Layer position="center" modal onClickOutside={onLoginClose} onEsc={onLoginClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Login
            </Heading>
            <Text color="status-critical">{ errMsg }</Text>
            <Text>email: <TextInput
            placeholder="email@townsquare.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
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
            type={revealPass ? "text" : "password"}
            value={passValue}
            onChange={event => passSetValue(event.target.value)}
            />
            <Button
            icon={revealPass ? <View size="medium" /> : <Hide size="medium" />}
            onClick={() => setRevealPass(!revealPass)}
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
                disabled={loading}
                onClick={sendLogin}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
      {openRegister && !openLogin && (
        <Layer position="center" modal onClickOutside={onRegisterClose} onEsc={onRegisterClose}>
          <Box pad="medium" gap="small" width="large">
            <Heading level={3} margin="none">
              Create an Account
            </Heading>
            <Text color="status-critical">{ errMsg }</Text>
            <Form
          onReset={event => console.log(event)}
          onSubmit={({ value, touched }) =>
            console.log("Submit", value, touched)
          }
        >
          <Text>First name: <TextInput
          placeholder=""
          value={fname}
          onChange={event => setFname(event.target.value)}
          /></Text>
          <Text>Last name: <TextInput
          placeholder=""
          value={lname}
          onChange={event => setLname(event.target.value)}
          /></Text>
          <Text>Email: <TextInput
          placeholder=""
          value={email}
          onChange={event => setEmail(event.target.value)}
          /></Text>
          <Text>Password:
          <Box
          width="medium"
          direction="row"
          round="small"
          border
          >
          <TextInput
          plain
          type={revealPass ? "text" : "password"}
          value={passValue}
          onChange={event => passSetValue(event.target.value)}
          />
          <Button
          icon={revealPass ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setRevealPass(!revealPass)}
          />
          </Box>
          </Text>
          <Text>Confirm password:
          <Box
          width="medium"
          direction="row"
          round="small"
          border
          >
          <TextInput
          plain
          type={revealCPass ? "text" : "password"}
          value={confirmPassValue}
          onChange={event => confirmPassSetValue(event.target.value)}
          />
          <Button
          icon={revealCPass ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setRevealCPass(!revealCPass)}
          />
          </Box>
          </Text>
        </Form>
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
                    <strong>Register</strong>
                  </Text>
                }
                disabled={loading}
                onClick={sendRegister}
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
        {showCreateEvent ? <CreateEvent /> :
          (showSavedList ? <SavedList /> :
            (showProfile ? <MyProfile /> :
              (showMyEvents ? <MyEvents /> :
                <ThemeContext.Extend value={richAccordionTheme}> <EventsList /> </ThemeContext.Extend>))) }
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
