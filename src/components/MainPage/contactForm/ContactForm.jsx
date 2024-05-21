import { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  <form onSubmit={onSubmit}>
    <label htmlFor="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <label htmlFor="subject">Subject</label>
    <input
      type="text"
      id="subject"
      name="subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />
    <label htmlFor="message">Message</label>
    <input
      type="text"
      id="message"
      name="subject"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button type="submit">Send</button>
  </form>;
}
