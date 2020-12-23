import React from "react";
import "./confirmModal.styles.scss";
import Button from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";
import { toggleConfirmModal } from "../../redux/app.slice";

const ConfirmModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisible, headerText, message } = useSelector((state: RootState) => {
    return {
      isVisible: state.app.modalState.isVisible,
      headerText: state.app.modalState.headerText,
      message: state.app.modalState.message,
    };
  });

  return (
    <div className={`modal ${isVisible ? "" : "hidden"}`}>
      <div className={"header"}>
        <h1>{headerText}</h1>
      </div>
      <div className={"body"}>
        <p>{message}</p>
        <div className={"buttonSection"}>
          <Button
            handleClick={() => dispatch(toggleConfirmModal())}
            value={"Nie"}
          />
          <Button value={"Tak"} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
