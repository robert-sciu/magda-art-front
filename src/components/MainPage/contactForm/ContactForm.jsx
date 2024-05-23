import { useState } from "react";
import styles from "./contactForm.module.scss";
import PropTypes from "prop-types";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Me</h2>
      <form onSubmit={onSubmit} className={styles.contactForm}>
        <label htmlFor="name">Name</label>
        <input
          placeholder="Your name"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          placeholder="Your email address"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="subject">Subject</label>
        <input
          placeholder="What do you want to talk about"
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="message">Message</label>
        <textarea
          // rows={5}
          placeholder="Your message"
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
