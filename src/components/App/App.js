import Landing from "../Landing/Landing";
import Results from "../Results/Results";
import "./App.css";
import Details from "../Details/Details";
import { Route, Routes } from "react-router";

function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={ <Landing />}
        />
        <Route
          path="/results"
          element={ <Results />}
        />
        <Route
          path="/results/:name"
          element={ <Details />}
        
        />
      </Routes>
    </main>
  );
}

export default App;
