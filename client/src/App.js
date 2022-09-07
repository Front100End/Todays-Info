import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/`} element={<Login />}></Route>
        <Route exact path={`/join`} element={<Join />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
