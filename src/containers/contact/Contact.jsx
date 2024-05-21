import styles from "./contact.module.scss";
import ContactGrid from "../../components/MainPage/contactGrid/ContactGrid";
import ContactForm from "../../components/MainPage/contactForm/ContactForm";

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div>
        <h2>Contact Me</h2>
        <ContactForm onSubmit={handleSubmit} />
      </div>
      <ContactGrid />
    </div>
  );
}
