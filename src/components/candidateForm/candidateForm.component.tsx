import React, { Dispatch, SetStateAction } from "react";
import "./candidateForm.styles.scss";
import FormInput from "../formInput/formInput.component";
import FormSelect from "../formSelect/formSelect.component";
import Button from "../button/button.component";
import { Poll } from "../../types/poll.types";

type Props = {
  inputValue: string;
  polls: Poll[];
  selectPoll: Dispatch<SetStateAction<any>>;
  onSubmit(e: React.FormEvent): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const CandidateForm: React.FC<Props> = ({
  onSubmit,
  inputValue,
  onChange,
  selectPoll,
  polls,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormInput
          type={"text"}
          value={inputValue}
          label={"Nazwa kandydata"}
          placeholder={"Nazwa"}
          onChange={onChange}
        />
        <FormSelect polls={polls} selectPoll={selectPoll} />
        <Button value={"Dodaj kandydata"} />
      </form>
    </div>
  );
};

export default CandidateForm;
