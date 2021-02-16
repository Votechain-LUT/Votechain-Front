import React, { useEffect, useState } from "react";
import "./pollForm.styles.scss";
import FormInput from "../formInput/formInput.component";
import DateTimePicker from "../dateTimePicker/dateTimePicker.component";
import Button from "../button/button.component";
import { toast } from "react-toastify";
import Http from "../../services/http.service";
import { useHistory, useLocation, useParams } from "react-router";
import { formatDate, parseDate } from "../../helpers";
import { GenerateTokensRequest } from "../../types";
import Select, { ValueType } from "react-select";

type ParamType = {
  id: string;
};

type MultiSelectOption = {
  label: string;
  value: string;
};

const PollForm: React.FC = () => {
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const history = useHistory();
  const location = useLocation();
  const params = useParams<ParamType>();
  const isEditPage = location.pathname.includes("edit");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrowDate);
  const [users, setUsers] = useState<MultiSelectOption[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<
    ValueType<MultiSelectOption, true>
  >([]);
  useEffect(() => {
    const http = new Http();
    if (isEditPage) {
      const fetchPoll = async () => {
        const pollId = params.id;
        const json = await http.getPoll(parseInt(pollId));
        setTitle(json.data.title);
        setStartDate(new Date(parseDate(json.data.start)));
        setEndDate(new Date(parseDate(json.data.end)));
      };
      const fetchUsers = async () => {
        const json = await http.getUsers();
        const users: React.SetStateAction<MultiSelectOption[]> = [];
        json.data.map((user) => {
          users.push({
            label: user.email,
            value: user.email,
          });
        });
        setUsers(users);
      };
      fetchUsers();
      fetchPoll();
    }
  }, [isEditPage, params.id]);

  const changeStartDate = (date: Date | [Date, Date] | null) => {
    date && !Array.isArray(date) && setStartDate(date);
  };
  const changeEndDate = (date: Date | [Date, Date] | null) => {
    date && !Array.isArray(date) && setEndDate(date);
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
      isActive: true,
    };
    const userRequestBody: GenerateTokensRequest = { users: [] };
    selectedUsers &&
      selectedUsers.map((user) => {
        userRequestBody.users.push(user.value);
      });
    try {
      if (isEditPage) {
        await http.updatePoll(parseInt(params.id), requestBody);
        if (userRequestBody.users.length > 0) {
          await http.generateTokens(parseInt(params.id), userRequestBody);
        }
        toast.success("Udało się zaktualizować głosowanie");
      } else {
        await http.createPoll(requestBody);
        toast.success("Udało się utworzyć głosowanie");
      }
      history.push("/admin/onGoingPolls");
    } catch (err) {
      if (!err.response) {
        toast.error("Upewnij się że jesteś połączony z siecią");
        return;
      }
      toast.error("Coś poszło nie tak :( " + err.response.data.detail);
    }
  };

  const onChange = (user: ValueType<MultiSelectOption, true>) => {
    setSelectedUsers(user);
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
        {isEditPage && (
          <Select
            value={selectedUsers}
            onChange={onChange}
            className={"mt20"}
            isMulti={true}
            options={users}
            placeholder={"Wybierz użytkowników"}
          />
        )}
        <Button
          className={"mt20"}
          value={`${isEditPage ? "Edytuj głosowanie" : "Dodaj głosowanie"}`}
        />
      </form>
    </div>
  );
};

export default PollForm;
