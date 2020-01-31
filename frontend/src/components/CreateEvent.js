import React, { Component, useState } from 'react';
import { grommet } from "grommet/themes";
import { Grommet, Box, InfiniteScroll, Text, Accordion, AccordionPanel, Heading } from "grommet";
import { Gamepad } from "grommet-icons";

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

export const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

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

const CreateEvent = (props) => {
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);

  return (
  <Accordion fill
    multiple
    onActive={activeIndexes => {
      if (activeIndexes.includes(1)) {
        // give sometime to emulate an async call
        setTimeout(() => setHighlightLoaded(true), 1000);
      }
    }}>
      
    </Accordion>
  );
}

export default CreateEvent;
