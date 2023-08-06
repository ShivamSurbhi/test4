import { Fragment } from "react";
import RouterLink from "../Link-Handler/RouterLink";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUp from "../SignUp-SignIn/SignUp";
import Welcome from "../Welcome/Welcome";
import SignIn from "../SignUp-SignIn/SignIn";
import Product from "../Product/Product";
import Dashboard from "../Dashboard/Dashboard";
import NotFound from "../NotFound/NotFound";
import Users from "../Users/Users";

const Menu = () => {
  const menuList = [
    {
      id: 1,
      name: "Product",
      route: "/product",
      visible: true,
    },
    {
      id: 2,
      name: "Users",
      route: "/users",
      visible: true,
    },
    {
      id: 3,
      name: "Dashboard",
      route: "/dashboard",
      visible: true,
    },
    {
      id: 4,
      name: "Sign In",
      route: "/signin",
      visible: true,
    },
    {
      id: 5,
      name: "Sign Up",
      route: "/signup",
      visible: true,
    },
    {
      id: 6,
      name: "Welcome",
      route: "/welcome",
      visible: false,
    },
  ];

  const renderElement = menuList.map((v, i) => {
    return (
      <Fragment key={i}>
        {v.visible && (
          <li className="nav-item">
            <Link to={v.route} className="nav-link">
              {v.name}
            </Link>
          </li>
        )}
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {renderElement}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item">
                    Action
                  </a>
                  <a className="dropdown-item">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<NotFound />} />
          {/* The Route below will handle any invalid route */}
          <Route path="*" element={<NotFound />} />
          {/* The Route below will handle any invalid route */}
        </Routes>
      </Router>
    </Fragment>
  );
};

export default Menu;
