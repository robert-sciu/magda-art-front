import styles from "./contact.module.scss";
import ContactGrid from "../../components/MainPage/contactGrid/ContactGrid";
import ContactForm from "../../components/MainPage/contactForm/ContactForm";

export default function Contact() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.contactSection} name="contact">
      <div className={styles.gridContainer}>
        <ContactForm onSubmit={handleSubmit} />
        <ContactGrid />
      </div>
    </div>
  );
}
