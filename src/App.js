import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Menu from "./Components/Menu/Menu";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <Fragment>
      <div className="container-fluid mt-2">
        {/* Menu with routing */}
        <Menu></Menu>
        {/* Menu with routing */}
      </div>
    </Fragment>
  );
}

export default App;
