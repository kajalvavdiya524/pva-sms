import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../common/navbar";
import TellabotService from "./tellabotService";
import { Redirect } from "react-router";
import isAuthorized from "../../common/Auth";
import Loader from "../../common/Loader";

function TellabotServiceContainer(props) {
  const [loading, setLoading_] = useState(0);
  const setLoading = (value) => {
    if (!isComponentMounted.current) return;

    if (value) {
      setLoading_((prevLoading) => prevLoading + 1);
    } else {
      setLoading_((prevLoading) => prevLoading - 1);
    }
  };
  const isComponentMounted = useRef(true);
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
    };
  });

  if (isAuthorized()) {
    return (
      <>
        {loading ? <Loader /> : <></>}
        <div className="offset-lg-2 col-lg-10 col-md-12 col-12 navbar-wrapper px-0">
          <Navbar
            setSidebar={props.setSidebar}
            sidebar={props.sidebar}
            currentPage="Websites for Tellabot Services"
          />
          <div className="content-wrapper">
            <TellabotService setLoading={setLoading} />
          </div>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}

export default TellabotServiceContainer;
