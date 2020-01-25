import React, { Component, useState } from 'react';
import { grommet } from "grommet/themes";
import { Grommet, Box, Button, Heading, Collapsible, ResponsiveContext, Layer, Accordion, AccordionPanel, Text, ThemeContext } from 'grommet';
import { Notification, FormClose, Bookmark, CircleInformation, FormSubtract, FormAdd, User } from 'grommet-icons';

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

function EventsTest() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);


    return (
      <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
      {size => (
        <Box fill>
        <title> Town Square </title>
        <AppBar>
        <Button
        icon={<Notification />}
        onClick={() => setShowSidebar(!showSidebar)}
        />
        </AppBar>
        <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
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

        <Box flex align='center' justify='center'>
        <Box flex direction="row">
          <ThemeContext.Extend value={richAccordionTheme}>
            <Accordion
              multiple
              onActive={activeIndexes => {
                if (activeIndexes.includes(1)) {
                  // give sometime to emulate an async call
                  setTimeout(() => setHighlightLoaded(true), 1000);
                }
              }}
            >
              <RichPanel icon={<CircleInformation />} label="Channel Details">
                <Box
                  pad={{
                    bottom: "medium",
                    horizontal: "small",
                    top: "small"
                  }}
                  gap="medium"
                >
                  <Box gap="xsmall">
                    <Text color="dark-3">
                      <strong>Purpose</strong>
                    </Text>
                    <Text>
                      Used for general announcements like new releases,
                      trainings...
                    </Text>
                  </Box>
                  <Box gap="xsmall">
                    <Text color="dark-3">
                      <strong>Created</strong>
                    </Text>
                    <Text>Created by Bryan Jacquot on January 19, 2016</Text>
                  </Box>
                </Box>
              </RichPanel>
              <RichPanel
                icon={<Bookmark color="accent-1" />}
                label="Highlights"
              >
                {highlightLoaded ? (
                  <Box
                    pad={{
                      bottom: "medium",
                      horizontal: "small",
                      top: "small"
                    }}
                    gap="medium"
                    overflow="auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <Text color="dark-3">
                      Below is the top message in
                      <strong>#announcements</strong>.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </Text>
                  </Box>
                ) : (
                  loading
                )}
              </RichPanel>
              <RichPanel icon={<User color="accent-2" />} label="2,000 members">
                <Box
                  pad={{
                    bottom: "medium",
                    horizontal: "xlarge",
                    top: "small"
                  }}
                  gap="medium"
                >
                  Yeah believe me, this channel has 2,000 members.
                </Box>
              </RichPanel>
            </Accordion>
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

export default EventsTest;
