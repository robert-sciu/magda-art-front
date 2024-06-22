import PropTypes from "prop-types";

import Spinner from "../../common/spinner/Spinner";

import styles from "./contactForm.module.scss";
import scss from "../../../../styles/variables.module.scss";

export default function ContactForm({
  onSubmit,
  name,
  email,
  subject,
  message,
  setName,
  setEmail,
  setSubject,
  setMessage,
  sendingInProgress,
}) {
  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
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
        <button type="submit">
          <span>
            {sendingInProgress ? <Spinner size={scss.sizeL} /> : null}
          </span>
          {sendingInProgress ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setSubject: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  sendingInProgress: PropTypes.bool,
};
