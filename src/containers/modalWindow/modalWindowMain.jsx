import { useRef } from "react";
import PropTypes from "prop-types";

import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { IoMove, IoClose } from "react-icons/io5";

import ErrorWindow from "../../components/modalWindow/errorWindow/errorWindow";
import ContactWindow from "../../components/modalWindow/contactModal/contactWindow";
import InfoModal from "../../components/modalWindow/infoModal/infoModal";

import styles from "./modalWindowMain.module.scss";

import {
  capitalizeString,
  classNameFormatter,
} from "../../utilities/utilities";

export default function ModalWindowMain({
  modalType,
  onCancel,
  data,
  disableBlur,
  onSetState,
  width = "M",
}) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  function handleBgClick(e) {
    if (
      e.target.className.includes("modalWindowBackground") ||
      e.target.className.includes("blur")
    ) {
      if (onCancel) {
        dispatch(onCancel());
      }
      if (onSetState) {
        onSetState(false);
      }
    }
  }
  function handleClose() {
    if (onCancel) {
      dispatch(onCancel());
    }
    if (onSetState) {
      onSetState(false);
    }
  }
  return (
    <div
      className={classNameFormatter({
        styles,
        classNames: ["modalWindowBackground", !disableBlur && "blur"],
      })}
      onClick={handleBgClick}
    >
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className={classNameFormatter({
            styles,
            classNames: [
              "modalWindowContainer",
              `width${capitalizeString(width)}`,
            ],
          })}
        >
          <div className={styles.dragArea}>
            <div className={styles.closeBtn} onClick={handleClose}>
              <IoClose />
            </div>
            <IoMove />
          </div>
          {modalType === "error" && (
            <ErrorWindow error={data} onCancel={onCancel} dispatch={dispatch} />
          )}
          {modalType === "info" && (
            <InfoModal info={data} onCancel={onCancel} dispatch={dispatch} />
          )}
          {modalType === "contact" && <ContactWindow onSetState={onSetState} />}
        </div>
      </Draggable>
    </div>
  );
}

ModalWindowMain.propTypes = {
  modalType: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  onDeleteSubmit: PropTypes.func,
  data: PropTypes.any,
  disableBlur: PropTypes.bool,
  OnConfirm: PropTypes.func,
  additionalInfo: PropTypes.any,
  onSetState: PropTypes.func,
  width: PropTypes.string,
};
