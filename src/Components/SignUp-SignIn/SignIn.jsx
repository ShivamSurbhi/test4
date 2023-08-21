import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VerifySigninThunk, addSignin, fetchSignin } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastUtility from "../../Utilities/toastUtility";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiResponse = useSelector((state) => {
    // console.clear();
    // console.log("state.signin", state.signin);
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

  const handleClick = async (e) => {
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
      console.log("isObjectEmpty", errObj);
      toastUtility.toastMessage("Form is not valid.", "warn");
    } else {
 

      try {
        const response = await dispatch(VerifySigninThunk(formData));

        console.log("response", response);
        let respErrorStatus = response?.error ? true : false;
        toastUtility.toastMessage(
          {
            pending: "Please wait",
            success: "Login Successfully 👌",
            error: "Incorrect Credentials 🤯",
            status: respErrorStatus,
          },
          "promise"
        );

        if (!respErrorStatus) {
          localStorage.setItem(
            "userDetail",
            JSON.stringify(response.payload.data)
          );
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("error", error);
      }
   
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
