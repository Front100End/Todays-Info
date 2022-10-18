import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Join from "./pages/Join/Join";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/login`} element={<Login />}></Route>
        <Route path={`/join`} element={<Join />}></Route>
        <Route exact path={`/`} element={<Home />}></Route>
        {/* 추후 / 과 /home 을 변경 메인을 /으로 login은 /login으로 변경 예정 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
