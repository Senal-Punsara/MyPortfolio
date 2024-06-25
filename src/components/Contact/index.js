import React from "react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Snackbar from '@mui/joy/Snackbar';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CallIcon from "@mui/icons-material/Call";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Button } from "@mui/base";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import validator from "validator";
import IconButton from '@mui/material/IconButton';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import "react-toastify/dist/ReactToastify.css";

import {
  ContactButton,
  ContactInputMessage,
  ContactInput,
  ContactTitle,
  PhoneLabel,
  ContactForm,
  Desc,
  Title,
  Wrapper,
  Container,
} from "../Contact/styles";

const Contact = () => {
  //hooks
  const [openW, setOpenW] = React.useState(false);
  const [openE, setOpenE] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_an8hjnc";
    const templateId = "template_lyvgl3o";
    const publicKey = "nYbOqAnCttLMUR6Mq";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Senal",
      message: message,
    };

    if (name && email && message) {
      if (!validator.isEmail(email)) {
        setOpenW(true);
      } else {
        // Send the email using EmailJS
        emailjs
          .send(serviceId, templateId, templateParams, publicKey)
          .then((response) => {
            //console.log("Email sent successfully!", response);
            setName("");
            setEmail("");
            setMessage("");
            setOpenS(true);
          })
          .catch((error) => {
            //console.error("Error sending email");
            setOpenE(true);
          });
      }
    } else {
      setOpenW(true);
    }
  };

  return (
    <Container id="contact">
      <Snackbar
        open={openW}
        color="warning"
        autoHideDuration={2000}
        onClose={() => setOpenW(false)}
        startDecorator={<WarningAmberRoundedIcon />}
        size="md"
        variant="solid"
        endDecorator={
          <IconButton
            onClick={() => setOpenW(false)}
            size="sm"
            style={{backgroundColor:""}}
          >
           <CancelRoundedIcon/>
          </IconButton>
        }
      >Please enter valid details</Snackbar>
      <Snackbar
        open={openE}
        color="danger"
        autoHideDuration={2000}
        startDecorator={<ReportGmailerrorredRoundedIcon />}
        onClose={() => setOpenW(false)}
        message="Please enter valid details."
        size="md"
        variant="solid"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        endDecorator={
          <IconButton
            onClick={() => setOpenE(false)}
            size="sm"
            style={{backgroundColor:""}}
          >
           <CancelRoundedIcon/>
          </IconButton>
        }
      >An error occurred. Please try again</Snackbar>
      <Snackbar
        open={openS}
        color="success"
        autoHideDuration={2000}
        startDecorator={<CheckRoundedIcon />}
        onClose={() => setOpenS(false)}
        size="md"
        variant="solid"
        endDecorator={
          <IconButton
            onClick={() => setOpenS(false)}
            size="sm"
            style={{backgroundColor:""}}
          >
           <CancelRoundedIcon/>
          </IconButton>
        }
      >Email send sucessfully</Snackbar>
      {/* Same as */}
     
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ContactInput
            placeholder="Your Name"
            name="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* <ContactInput placeholder="Subject" name="subject" /> */}
          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ContactButton type="submit">Send</ContactButton>
        </ContactForm>
        <ContactForm>
          <ContactTitle>Via Phone 📞</ContactTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <PhoneLabel>
              <PhoneIphoneIcon style={{ marginTop: "0px", color: "white" }} />
              <p style={{ fontSize: "25px", color: "white" }}> 071 0554 474</p>
            </PhoneLabel>
            <PhoneLabel>
              <CallIcon style={{ marginTop: "0px", color: "white" }} />
              <p style={{ fontSize: "25px", color: "white" }}>
                011&nbsp; 2770 654
              </p>
            </PhoneLabel>
          </div>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
