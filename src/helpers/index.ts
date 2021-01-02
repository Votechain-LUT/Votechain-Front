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
    case "canceledPolls":
      return "Anulowane głosowania";
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
    case "canceledPolls":
      return "anulowane";
    default:
      return "";
  }
};

export const formatDate = (date: Date): string => {
  const dateArray = date.toLocaleString("pl-pl").split(",");
  const yearMonthDay = dateArray[0];
  return yearMonthDay
    .replaceAll(".", "-")
    .concat(`${dateArray[1].replace("PM", "")}`);
};

export const parseDate = (date: string): Date => {
  const arr = date.split(" ");
  const dayMonthYear = arr[0];
  const dateParts = dayMonthYear.split("-");
  const dateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${arr[1]}`;
  return new Date(dateString);
};
