import React, { useEffect, useState } from "react";
import "./poll.styles.scss";
import { useHistory, useParams } from "react-router";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import Http from "../../../../services/http.service";
import { Poll } from "../../../../types";
import { getPollStatus } from "../../../../helpers";
import Button from "../../../../components/button/button.component";
import { Location } from "history";

type ParamTypes = {
  pollId: string;
};

type CustomLocationProps = {
  pollType: string;
};

type LocationProps = Location<CustomLocationProps>;

type Props = {
  location: LocationProps;
};

const PollPage: React.FC<Props> = ({ location }) => {
  const [poll, setPoll] = useState<Poll>();
  const [pollStatus, setPollStatus] = useState("");
  const { pollId } = useParams<ParamTypes>();
  const history = useHistory();

  useEffect(() => {
    const fetchPoll = async () => {
      const http = new Http();
      if (parseInt(pollId)) {
        const json = await http.getPoll(parseInt(pollId));
        setPoll(json.data);
      } else {
        history.push("/admin/onGoingPolls");
      }
      setPollStatus(location.state.pollType);
    };
    fetchPoll();
  }, [history, location.state.pollType, pollId]);
  return (
    <section className={"pollPage"}>
      <Sidebar sidebarField={""} />
      {poll && (
        <div className={"wrapper"}>
          <span className={"title"}>{poll.title}</span>
          <div className={"infoBox"}>
            <div>Data rozpoczęcia głosowania: {poll.start}</div>
            <div>Data zakończenia głosowania: {poll.end}</div>
            <div>Status głosowania: {getPollStatus(pollStatus)}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Kandydat</th>
                <th>Liczba zdobytych głosów</th>
              </tr>
            </thead>
            <tbody>
              {poll.candidates &&
                poll.candidates.map((candidate, key) => {
                  return (
                    <tr key={key}>
                      <td>{candidate.name}</td>
                      <td>0</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {pollStatus === "onGoingPolls" && (
            <Button className={"mb20"} value={"Odśwież wyniki"} />
          )}
          <div className={"buttonsSection"}>
            {(pollStatus === "createdPolls" ||
              pollStatus === "futurePolls") && (
              <Button value={"Rozpocznij głosowanie"} />
            )}
            {pollStatus === "onGoingPolls" && (
              <Button value={"Zakończ głosowanie"} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PollPage;
