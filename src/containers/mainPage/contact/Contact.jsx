import { useState } from "react";

import { useSelector } from "react-redux";

import ContactGrid from "../../../components/MainPage/contactGrid/ContactGrid";
import ContactForm from "../../../components/MainPage/contactForm/ContactForm";
import ContactInfo from "../../../components/MainPage/contactInfo/ContactInfo";

import {
  selectBigContactImage,
  selectSmallContactImages,
} from "../../../store/mainPageImagesSlice";

import styles from "./contact.module.scss";

import api from "../../../api/api";

const api_url = import.meta.env.VITE_API_BASE_URL;

/**
 * Render the Contact component with form and decorative grid.
 *
 * @return {JSX.Element} The Contact component JSX
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendingInProgress, setSendingInProgress] = useState(false);
  const [messageStatus, setMessageStatus] = useState("");

  const contactImageBig = useSelector(selectBigContactImage);
  const contactImagesSmall = useSelector(selectSmallContactImages);

  const allImagesArray = [
    ...Object.values(contactImageBig),
    ...Object.values(contactImagesSmall),
  ];

  async function handleSubmit() {
    setSendingInProgress(true);

    const requestBody = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    const response = await api.post(`${api_url}/mail`, requestBody);

    if (response.status === 200) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setMessageStatus("Message sent successfully");
    } else {
      setMessageStatus("Message failed to send");
    }
    setSendingInProgress(false);
  }

  function handleConfirm() {
    setMessageStatus("");
  }

  return (
    <div className={styles.contactSection} name="contact">
      <div className={styles.gridContainer}>
        {messageStatus ? (
          <ContactInfo
            messageStatus={messageStatus}
            onConfirm={handleConfirm}
          />
        ) : (
          <ContactForm
            onSubmit={handleSubmit}
            name={name}
            email={email}
            subject={subject}
            message={message}
            setName={setName}
            setEmail={setEmail}
            setSubject={setSubject}
            setMessage={setMessage}
            sendingInProgress={sendingInProgress}
          />
        )}

        <ContactGrid allImagesArray={allImagesArray} />
      </div>
    </div>
  );
}
