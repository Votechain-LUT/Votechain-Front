import React, { useEffect, useState } from "react";
import "./pollForm.styles.scss";
import FormInput from "../formInput/formInput.component";
import DateTimePicker from "../dateTimePicker/dateTimePicker.component";
import CheckBox from "../checkbox/checkBox.component";
import Button from "../button/button.component";
import { toast } from "react-toastify";
import Http from "../../services/http.service";
import { useHistory, useLocation, useParams } from "react-router";
import { formatDate, parseDate } from "../../helpers";

type ParamType = {
  id: string;
};

const PollForm: React.FC = () => {
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const history = useHistory();
  const location = useLocation();
  const params = useParams<ParamType>();
  const isEditPage = location.pathname.includes("edit");
  const [title, setTitle] = useState("");
  const [isActive, setActive] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrowDate);

  useEffect(() => {
    if (isEditPage) {
      const fetchPoll = async () => {
        const http = new Http();
        const pollId = params.id;
        const json = await http.getPoll(parseInt(pollId));
        setTitle(json.data.title);
        setStartDate(new Date(parseDate(json.data.start)));
        setEndDate(new Date(parseDate(json.data.end)));
        setActive(json.data.isActive);
      };
      fetchPoll();
    }
  }, [isEditPage, params.id]);

  const changeStartDate = (date: Date | [Date, Date] | null) => {
    date && !Array.isArray(date) && setStartDate(date);
  };
  const changeEndDate = (date: Date | [Date, Date] | null) => {
    date && !Array.isArray(date) && setEndDate(date);
  };

  const toggleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 3) {
      toast.error("Nazwa głosowania musi zawierać przynajmniej 3 znaki");
      return;
    }
    if (startDate > endDate) {
      toast.error("Data rozpoczęcia musi być przed datą zakończenia");
      return;
    }
    const http = new Http();
    const requestBody = {
      title: title,
      start: formatDate(startDate),
      end: formatDate(endDate),
      isActive: isActive,
    };

    try {
      if (isEditPage) {
        await http.updatePoll(parseInt(params.id), requestBody);
        toast.success("Udało się zaktualizować głosowanie");
      } else {
        await http.createPoll(requestBody);
        toast.success("Udało się utworzyć głosowania");
      }
      history.push("/admin/createdPolls");
    } catch (err) {
      toast.error("Coś poszło nie tak :( " + err);
    }
  };

  return (
    <div className={"pollForm"}>
      <form onSubmit={onSubmit}>
        <FormInput
          type={"text"}
          value={title}
          label={"Nazwa głosowania"}
          placeholder={"Nazwa głosowania"}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DateTimePicker
          showTime={true}
          shouldCloseOnSelect={true}
          minDate={new Date()}
          locale={"pl"}
          label={"Data rozpoczęcia głosowania"}
          dateFormat={"dd-MM-yyyy HH:mm"}
          timeCaption={"Czas"}
          selected={startDate}
          onChange={(date) => changeStartDate(date)}
        />
        <DateTimePicker
          showTime={true}
          shouldCloseOnSelect={true}
          minDate={tomorrowDate}
          locale={"pl"}
          label={"Data zakończenia głosowania"}
          dateFormat={"dd-MM-yyyy HH:mm"}
          timeCaption={"Czas"}
          selected={endDate}
          onChange={(date) => changeEndDate(date)}
        />
        <CheckBox
          label={"Aktywne"}
          isChecked={isActive}
          className={"mt20"}
          onChange={toggleCheckBox}
        />
        <Button
          className={"mt20"}
          value={`${isEditPage ? "Edytuj głosowanie" : "Dodaj głosowanie"}`}
        />
      </form>
    </div>
  );
};

export default PollForm;
