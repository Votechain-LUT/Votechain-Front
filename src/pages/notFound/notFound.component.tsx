import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./notFound.styles.scss";

const NotFoundPage = () => {
  useEffect(() => {
    const appWrapper = document.querySelector(".appWrapper");
    appWrapper?.classList.add("hidden");
    return () => {
      appWrapper?.classList.remove("hidden");
    };
  }, []);
  return (
    <section className={"notFoundPage"}>
      <h1>404 :(</h1>
      <span>Przepraszamy, ale strona której szukasz nie istnieje</span>
      <Link to={"/"}>Wróć do strony głównej</Link>
    </section>
  );
};

export default NotFoundPage;
