import styles from "./contactForm.module.scss";

import InputElement from "../../elements/inputElement/inputElement";
import Button from "../../elements/button/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMail } from "../../../store/mailerSlice";
import { selectMailerLoadingStatus } from "../../../store/mailerSlice";
import { checkEmailData, resetErrors } from "../../../utilities";
import { selectMailerSuccessMessage } from "../../../store/mailerSlice";
import { clearMailerMessage } from "../../../store/mailerSlice";

import PropTypes from "prop-types";
import {
  capitalizeString,
  classNameFormatter,
} from "../../../utilities/utilities";

export default function ContactForm({ onSetState, padding = "L" }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const isSending = useSelector(selectMailerLoadingStatus);
  const mailSentMessage = useSelector(selectMailerSuccessMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mailSentMessage) return;
    if (!name && !email && !subject && !message) return;
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }, [mailSentMessage, name, email, subject, message]);

  async function handleSubmit(e) {
    e.preventDefault();
    resetErrors([
      setNameError,
      setEmailError,
      setSubjectError,
      setMessageError,
    ]);

    const isValid = await checkEmailData({
      name,
      onNameError: setNameError,
      email,
      onEmailError: setEmailError,
      subject,
      onSubjectError: setSubjectError,
      message,
      onMessageError: setMessageError,
    });

    if (!isValid) {
      return;
    }

    const requestBody = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    dispatch(sendMail({ data: requestBody }));
  }

  function handleClick() {
    dispatch(clearMailerMessage());
    if (onSetState) {
      onSetState(false);
    }
  }

  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: ["contactContainer", `padding${capitalizeString(padding)}`],
      })}
    >
      <div>
        <h2>Contact Me</h2>
      </div>

      <form className={styles.contactForm}>
        <InputElement
          type="text"
          value={name}
          label={"Name"}
          onChange={(e) => setName(e.target.value)}
          width={100}
          alignment={"left"}
          name={"name"}
          inputError={nameError}
          isDisabled={isSending || mailSentMessage ? true : false}
        />
        <InputElement
          type="email"
          autoComplete="email"
          value={email}
          label={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          width={100}
          alignment={"left"}
          name={"email"}
          inputError={emailError}
          isDisabled={isSending || mailSentMessage ? true : false}
        />
        <InputElement
          type="text"
          value={subject}
          label={"Subject"}
          onChange={(e) => setSubject(e.target.value)}
          width={100}
          alignment={"left"}
          name={"subject"}
          inputError={subjectError}
          isDisabled={isSending || mailSentMessage ? true : false}
        />
        <InputElement
          type="textArea"
          value={message}
          label={"Message"}
          onChange={(e) => setMessage(e.target.value)}
          width={100}
          alignment={"left"}
          name={"message"}
          inputError={messageError}
          isDisabled={isSending || mailSentMessage ? true : false}
        />
        {!mailSentMessage && (
          <Button
            label={"Send"}
            style={"greenBtn"}
            onClick={handleSubmit}
            isLoading={isSending}
            loadingLabel={"Sending..."}
            disabled={isSending}
          />
        )}
        {mailSentMessage && (
          <div className={styles.successMessage}>
            <p>{mailSentMessage}</p>
            <Button label={"Cool!"} onClick={handleClick} />
          </div>
        )}
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  onSetState: PropTypes.func,
  padding: PropTypes.string,
};
