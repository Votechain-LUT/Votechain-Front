export const validateEmail = (email: string): boolean => {
  //eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getPageName = (sidebarField: string): string => {
  switch (sidebarField) {
    case "onGoingPolls":
      return "Trwające głosowania";
    case "futurePolls":
      return "Nadchodzące głosowania";
    case "endedPolls":
      return "Zakończone głosowania";
    case "createdPolls":
      return "Utworzone głosowania";
    case "newCandidate":
      return "Dodaj kandydata";
    case "newPoll":
      return "Dodaj głosowanie";
    default:
      return "";
  }
};

export const getPollStatus = (url: string): string => {
  switch (url) {
    case "onGoingPolls":
      return "w trakcie";
    case "futurePolls":
      return "nadchodzące";
    case "endedPolls":
      return "zakończone";
    case "createdPolls":
      return "utworzone";
    default:
      return "";
  }
};
