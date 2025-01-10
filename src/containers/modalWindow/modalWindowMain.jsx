import { IoMove, IoClose } from "react-icons/io5";
import styles from "./modalWindowMain.module.scss";
import Draggable from "react-draggable";
import { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// import { clearTempData } from "../../../store/fullCalendarSlice";
import { classNameFormatter } from "../../utilities/utilities";
import ErrorWindow from "../../components/modalWindow/errorWindow";

export default function ModalWindowMain({
  modalType,
  // onSubmit,
  // OnConfirm,
  onCancel,
  // onDeleteSubmit,
  data,
  disableBlur,
  // additionalInfo,
}) {
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  function handleBgClick(e) {
    if (
      e.target.className.includes("modalWindowBackground") ||
      e.target.className.includes("blur")
    ) {
      if (onCancel) {
        // dispatch(clearTempData());
        dispatch(onCancel());
      }
    }
  }
  function handleClose() {
    if (onCancel) {
      dispatch(onCancel());
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
        <div ref={nodeRef} className={styles.modalWindowContainer}>
          <div className={styles.dragArea}>
            <div className={styles.closeBtn} onClick={handleClose}>
              <IoClose />
            </div>
            <IoMove />
          </div>
          {/* {modalType === "reservation" && (
            <ReservationModal
              reservation={data}
              onSubmit={onSubmit}
              onCancel={onCancel}
              dispatch={dispatch}
            />
          )} */}
          {modalType === "error" && (
            <ErrorWindow error={data} onCancel={onCancel} dispatch={dispatch} />
          )}
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
};
