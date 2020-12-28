import React, { useEffect, useState } from "react";
import "./confirmModal.styles.scss";
import Button from "../button/button.component";

type Props = {
  headerText: string;
  message: string;
  isVisible: boolean;
  handleSubmit(): void;
  toggleModal(visible: boolean): void;
};

const ConfirmModal: React.FC<Props> = ({
  headerText,
  message,
  isVisible,
  handleSubmit,
  toggleModal,
}) => {
  const [visible, setVisible] = useState(false);
  const overlay = document.getElementById("overlay");
  useEffect(() => {
    if (overlay) {
      isVisible
        ? (overlay.style.display = "block")
        : (overlay.style.display = "none");
    }
    setVisible(isVisible);
  }, [isVisible, overlay]);

  const hideModal = () => {
    if (overlay) overlay.style.display = "none";
    toggleModal(false);
    setVisible(false);
  };

  const onSubmit = () => {
    hideModal();
    handleSubmit();
  };

  return (
    <div className={`modal ${visible ? "" : "hidden"}`}>
      <div className={"header"}>
        <h1>{headerText}</h1>
      </div>
      <div className={"body"}>
        <p>{message}</p>
        <div className={"buttonSection"}>
          <Button value={"Nie"} handleClick={() => hideModal()} />
          <Button handleClick={() => onSubmit()} value={"Tak"} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
