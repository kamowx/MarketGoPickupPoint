import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Signin from "./screens/signin";
import Pickupinfo from "./screens/pickupinfo";
import Pickupcheck from "./screens/pickupcheck";
import Profile from "./screens/profile";
import Pickuporders from "./screens/pickuporders";
import Pickuppoint from "./screens/pickuppoint";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/pickupinfo" element={<Pickupinfo />} />
        <Route path="/pickupcheck" element={<Pickupcheck />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pickuporders" element={<Pickuporders />} />
        <Route path="/pickuppoint" element={<Pickuppoint />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
