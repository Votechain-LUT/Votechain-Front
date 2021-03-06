import React, { useEffect, useState } from "react";
import "./polls.styles.scss";
import { useHistory, useLocation } from "react-router";
import { Poll } from "../../types";
import FormInput from "../../components/formInput/formInput.component";
import Button from "../../components/button/button.component";
import Select, { ActionMeta, ValueType } from "react-select";
import Http from "../../services/http.service";
import { toast } from "react-toastify";

type LocationType = {
  poll: Poll;
};

type SelectOption = {
  label: string;
  value: string;
};

const UserPollPage = () => {
  const params = useLocation<LocationType>();
  const history = useHistory();
  const { poll } = params.state;
  const [voteToken, setVoteToken] = useState("");
  const [candidates, setCandidates] = useState<SelectOption[]>([]);
  const [candidate, selectCandidate] = useState<ValueType<SelectOption, true>>(
    []
  );
  useEffect(() => {
    const options: React.SetStateAction<SelectOption[]> = [];
    if (poll.candidates && poll.candidates.length > 0) {
      poll.candidates.map((candidate) => {
        options.push({
          label: candidate.name,
          value: String(candidate.id),
        });
      });
    }
    setCandidates(options);
    // const http = new Http();
    // const test = async () => {
    //   const json = await http.getVoteResults(poll.id);
    //   console.log(json);
    // };
    // test();
  }, []);

  const vote = async () => {
    const http = new Http();
    if (voteToken.length === 0) {
      toast.error("Brak tokenu do głosowania");
      return;
    }
    if (!candidate) {
      toast.error("Nie wybrano kandydata");
      return;
    }
    try {
      //eslint-disable-next-line
      // @ts-ignore
      await http.vote(poll.id, candidate.value, { token: voteToken });
      toast.success("Głos został oddany pomyślnie");
      history.push("/polls");
    } catch (err) {
      toast.error("Coś poszło nie tak... :( " + err.response.data.detail);
    }
  };

  const onChange = (
    candidate: SelectOption | null,
    e: ActionMeta<SelectOption>
  ) => {
    if (candidate) {
      //eslint-disable-next-line
      //@ts-ignore
      selectCandidate(candidate);
    }
  };

  return (
    <section className={"pollsPage"}>
      <div className={"wrapper"}>
        <div>
          <span className={"bold"}>Nazwa głosowania: </span>
          <span>{poll.title}</span>
        </div>
        <div>
          <span className={"bold"}>Data rozpoczęcia głosowania: </span>
          <span>{poll.start}</span>
        </div>
        <div>
          <span className={"bold"}>Data zakończenia głosowania: </span>
          <span>{poll.end}</span>
        </div>
        <div className={"mb20"}>
          <span className={"bold"}>Kandydaci: </span>
          {poll.candidates && (
            <Select
              value={candidate[0]}
              placeholder={"Wybierz kandydata"}
              onChange={onChange}
              options={candidates}
            />
          )}
        </div>
        <FormInput
          type={"text"}
          value={voteToken}
          label={"Token do głosowania"}
          placeholder={"Token do głosowania"}
          onChange={(e) => setVoteToken(e.target.value)}
        />
        <div className={"buttonSection"}>
          <Button handleClick={vote} value={"Oddaj głos"} />
        </div>
      </div>
    </section>
  );
};

export default UserPollPage;
