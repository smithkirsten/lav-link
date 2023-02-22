import Landing from "../Landing/Landing";
import Results from "../Results/Results";
import Details from "../Details/Details";
import Error from '../Error/Error'
import "./App.css";
import { Route, Routes } from "react-router";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/bathroom" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
