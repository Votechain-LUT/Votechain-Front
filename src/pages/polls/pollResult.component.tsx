import React, { useState, useEffect } from "react";
import "./polls.styles.scss";
import { Poll } from "../../types";
import { useHistory, useLocation } from "react-router";
import FormInput from "../../components/formInput/formInput.component";
import Button from "../../components/button/button.component";
import Http from "../../services/http.service";
import { toast } from "react-toastify";

type LocationType = {
  poll: Poll;
};

type PollResult = {
  candidate_name: string;
  number_of_votes: string;
};

const PollResultPage = () => {
  const params = useLocation<LocationType>();
  const { poll } = params.state;
  const [verifyToken, setVerifyToken] = useState("");
  const [pollResults, setPollResults] = useState<PollResult[]>([]);

  useEffect(() => {
    const http = new Http();
    const fetchResults = async () => {
      const json = await http.getVoteResults(poll.id);
      setPollResults(json.data["results"]);
    };
    fetchResults();
  }, []);

  const verifyVote = async () => {
    const http = new Http();
    if (verifyToken.length === 0) {
      toast.error("Brak tokenu do weryfikacji głosu");
      return;
    }
    try {
      const json = await http.verifyVote(poll.id, { token: verifyToken });
      //eslint-disable-next-line
      //@ts-ignore
      toast.success(`Głos oddano na kandydata: ${json.data["candidate_name"]}`);
    } catch (err) {
      toast.error("Coś poszło nie tak... :(" + err.response.data.detail);
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
        <div className={"mb20 tableWrapper"}>
          <table>
            <thead>
              <tr>
                <th>Kandydat</th>
                <th>Liczba uzyskanych głosów</th>
              </tr>
            </thead>
            <tbody>
              {pollResults &&
                pollResults.map((result, key) => {
                  return (
                    <tr key={key}>
                      <td>{result.candidate_name}</td>
                      <td>{result.number_of_votes}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <FormInput
          type={"text"}
          value={verifyToken}
          label={"Token do weryfikacji głosu"}
          placeholder={"Token do weryfikacji głosu"}
          onChange={(e) => setVerifyToken(e.target.value)}
        />
        <div className={"buttonSection"}>
          <Button handleClick={verifyVote} value={"Zweryfikuj głos"} />
        </div>
      </div>
    </section>
  );
};

export default PollResultPage;
