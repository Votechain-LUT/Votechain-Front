import React, { useEffect, useState } from "react";
import "./newCandidate.styles.scss";
import CandidateForm from "../../../../components/candidateForm/candidateForm.component";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import { toast } from "react-toastify";
import Http from "../../../../services/http.service";
import { Poll } from "../../../../types/poll.types";
import { useHistory } from "react-router";

const NewCandidatePage = () => {
  const [name, setName] = useState("");
  const [selectedPollId, selectPoll] = useState<number | undefined>();
  const [polls, setPolls] = useState<Poll[]>([]);
  const history = useHistory();
  useEffect(() => {
    const http = new Http();
    const fetchPolls = async () => {
      const json = await http.getFutureCreatedPolls();
      setPolls(json.data);
      if (json.data.length) {
        selectPoll(json.data[0].id);
      }
    };
    fetchPolls();
  }, []);

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (name.length < 3) {
      toast.error("Nazwa kandydata musi mieć minimum 3 znaki");
      setName("");
      return;
    }
    const http = new Http();
    try {
      if (selectedPollId) {
        const body = {
          name: name,
        };
        await http.addCandidateToPoll(selectedPollId, body);
        toast.success("Kandydat został dodany do głosowania");
        history.push("/admin/createdPolls");
      }
    } catch (err) {
      toast.error("Coś poszło nie tak :( " + err.message);
    }
  };

  return (
    <section className={"newCandidatePage"}>
      <Sidebar sidebarField={"newCandidate"} />
      <div className={"wrapper"}>
        <span className={"title"}>Dodaj kandydata</span>
        <CandidateForm
          selectPoll={selectPoll}
          inputValue={name}
          polls={polls}
          onSubmit={onSubmit}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </section>
  );
};

export default NewCandidatePage;
