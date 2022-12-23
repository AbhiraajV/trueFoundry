import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./vars";
import { useNavigate, useSearchParams } from "react-router-dom";

function Callback({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const createGithubRepo = async () => {
    const status = searchParams.get("status");
    const gh_generated_token = searchParams.get("gh_token");
    console.log({ status, gh_generated_token });
    if (status === "success") {
      const out = await axios.post(
        BASE_URL + "/auth/gh/repo",
        {
          gh_generated_token,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      );
      console.log(out);
      navigate("/congrats");
    } else {
      console.log(
        "Something went wrong during your github authentication, please make sure to  allow access  "
      );
    }
  };
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        Github Access Granted!!
        <button onClick={() => createGithubRepo()}>Create the repo</button>
      </header>
    </div>
  );
}

export default Callback;
