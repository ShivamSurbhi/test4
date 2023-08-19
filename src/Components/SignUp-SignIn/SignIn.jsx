import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifySigninThunk, fetchSignin } from "../Store";
import { Link } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, data, errors } = useSelector((state) => {
    return state.signin;
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const errorInitialState = {
    email: "",
    password: "",
  };

  const [error, SetError] = useState(errorInitialState);

  function removeErr() {
    setTimeout(() => {
      SetError(errorInitialState);
    }, 3000);
  }

  const handleClick = (e) => {
    e.preventDefault();

    let errObj = { email: "", password: "" };

    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(formData.email)) {
      errObj.email = "Enter correct E-mail format";
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      errObj.password =
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character";
    }

    const isObjectEmpty = Object.values(errObj).every((value) => {
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (!isObjectEmpty) {
      SetError(errObj);
      removeErr();
    } else {
      localStorage.setItem("userDetail", JSON.stringify(formData));
      dispatch(fetchSignin(formData));
      console.log("data", data);
      SetError(errorInitialState);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Fragment>
      <div className="text-center">
        <h5>SignIn </h5>
      </div>

      <div className="mt-4">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">E-mail</label>
            <input
              type="text"
              className="form-control"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
            />
            <span className="text-danger">{error.email}</span>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => handleFormChange(e)}
            />

            <span className="text-danger">{error.password}</span>
          </div>
          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>

          <div className="mt-4 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Submit
            </button>

            <button className="mx-2 btn btn-info">
              <Link to="/signup" className="nav-link">
                SignUp
              </Link>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignIn;
