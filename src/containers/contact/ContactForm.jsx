import styles from "./contactForm.module.scss";
import ContactGrid from "../../components/MainPage/contactGrid/ContactGrid";

export default function ContactForm() {
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
