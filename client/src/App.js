import axios from "axios";
import "./App.css";
import BasicLogin from "./BasicLogin";
import { BASE_URL } from "./vars";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("user") ? (
          <b>
            <a
              href={BASE_URL + "/auth/gh/login"}
              style={{
                color: "white",
              }}
            >
              Click here to allow us to create a repo for you
            </a>
          </b>
        ) : (
          <BasicLogin />
        )}
      </header>
    </div>
  );
}

export default App;
