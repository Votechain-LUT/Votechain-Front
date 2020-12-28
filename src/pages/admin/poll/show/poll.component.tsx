import React, { useEffect, useState } from "react";
import "./poll.styles.scss";
import { useHistory, useParams } from "react-router";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import Http from "../../../../services/http.service";
import { Candidate, Poll } from "../../../../types";
import { getPollStatus } from "../../../../helpers";
import Button from "../../../../components/button/button.component";
import { Location } from "history";
import deleteIcon from "../../../../assets/delete.png";
import ConfirmModal from "../../../../components/confirmModal/confirmModal.component";
import { toast } from "react-toastify";

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
  const [candidateToDelete, setCandidate] = useState<Candidate | null>();
  const [pollStatus, setPollStatus] = useState("");
  const [modalVisible, toggleModal] = useState(false);
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
  }, [history, location.state.pollType, pollId, candidateToDelete]);

  const showDeleteModal = (candidate: Candidate) => {
    toggleModal(true);
    setCandidate(candidate);
  };

  const deleteCandidate = async () => {
    const http = new Http();
    try {
      if (poll && poll.id && candidateToDelete && candidateToDelete.id) {
        await http.deleteCandidate(poll.id, candidateToDelete.id);
        setCandidate(null);
        toast.success("Udało się usunąć kandydata");
        history.push({
          pathname: `/admin/poll/${poll.id}`,
          state: {
            pollType: pollStatus,
          },
        });
      }
    } catch (err) {
      toast.error("Coś poszło nie tak :( " + err.response.data.detail);
    }
  };

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
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {poll.candidates &&
                poll.candidates.map((candidate, key) => {
                  return (
                    <tr key={key}>
                      <td>{candidate.name}</td>
                      <td>0</td>
                      <td>
                        <div
                          role={"presentation"}
                          onClick={() => showDeleteModal(candidate)}
                          className={"iconContainer"}
                        >
                          <img src={deleteIcon} alt={"deleteIcon"} />
                          <span>Usuń kandydata</span>
                        </div>
                      </td>
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
      <ConfirmModal
        headerText={"Usuń kandydata"}
        message={"Czy na pewno chcesz usunąć tego kandydata?"}
        isVisible={modalVisible}
        handleSubmit={deleteCandidate}
        toggleModal={toggleModal}
      />
    </section>
  );
};

export default PollPage;
