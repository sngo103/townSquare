import React, { Component, useState } from 'react';
import { grommet } from "grommet/themes";
import { Grommet, Box, InfiniteScroll, Text, TextArea, Accordion, AccordionPanel, Headin, Form, Heading, Button, FormField, TextInput } from "grommet";
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

const CreateEvent = (props) => {
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(undefined);
  const [eventname, setEventName] = React.useState(undefined);
  const [eventdate, setEventDate] = React.useState(undefined);
  const [eventtime, setEventTime] = React.useState(undefined);
  const [eventlocation, setEventLocation] = React.useState(undefined);
  const [eventdescription, setEventDescription] = React.useState(undefined);
  const [eventorganizer, setEventOrganizer] = React.useState(undefined);
  const [eventcontact, setEventContact] = React.useState(undefined);

  return (
  <Box flex width="large" pad="medium" align="center" justify="center"><strong>
        <Heading level={3} margin="none">
          New Event
        </Heading>
        <Text color="status-critical">{ errMsg }</Text>
        <Form
      onReset={event => console.log(event)}
      onSubmit={({ value, touched }) =>
        console.log("Submit", value, touched)
      }
    >
      <Text>Event Name: <TextInput
      placeholder=""
      value={eventname}
      onChange={() => {}} //{event => setFname(event.target.value)}
      /></Text>
      <Text>Date: <TextInput
      placeholder=""
      value={eventdate}
      onChange={() => {}} //{event => setLname(event.target.value)}
      /></Text>
      <Text>Time: <TextInput
      placeholder=""
      value={eventtime}
      onChange={() => {}} //{event => setLname(event.target.value)}
      /></Text>
      <Text>Location: <TextInput
      placeholder=""
      value={eventlocation}
      onChange={() => {}} //{event => setLname(event.target.value)}
      /></Text>
      <Text>Event Description: <TextArea
      placeholder=""
      value={eventdescription}
      onChange={() => {}} // {event => setEmail(event.target.value)}
      /></Text>
      <Text>Organizer: <TextInput
      placeholder=""
      value={eventorganizer}
      onChange={() => {}} //{event => setLname(event.target.value)}
      /></Text>
      <Text>How to Contact Us: <TextInput
      placeholder=""
      value={eventcontact}
      onChange={() => {}} //{event => setLname(event.target.value)}
      /></Text>
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
                <strong>Create Event</strong>
              </Text>
            }
            disabled={loading}
            onClick={() => {}}
            primary
            color="status-critical"
          />
      </Box>
  </strong></Box>
  );
}

export default CreateEvent;
