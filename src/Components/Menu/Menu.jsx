import { Fragment, useEffect, useState } from "react";
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

  const [cartNo, setCartNo] = useState();

  useEffect(() => {
    var localCart = JSON.parse(localStorage.getItem('cart'));
    setCartNo(localCart);
  }, [])
  
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
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {renderElement}
              </ul>

              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="javascript:void(0)"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello, Shivam<br></br>
                  <b>Account</b>
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="javascript:void(0)">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript:void(0)">
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="javascript:void(0)">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                class="btn btn-light position-relative mx-3"
              >
                Cart
                {cartNo?.length > 0 && (
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartNo?.length}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                )}
              </button>
            </div>
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
