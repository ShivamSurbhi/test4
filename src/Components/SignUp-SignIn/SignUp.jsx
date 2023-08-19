import { type } from "@testing-library/user-event/dist/type";
import { Fragment, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { addSignin } from "../Store";
import { Link, useNavigate  } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const [ageList, setAgeList] = useState([]);

  const formInitialState = {
    email: "",
    password: "",
    age: "",
    username: "",
  };
  const [formData, setFormData] = useState(formInitialState);

  const formErrorInitialState = {
    email: "",
    password: "",
    age: "",
    username: "",
  };

  const [formError, setFormError] = useState(formErrorInitialState);

  function resetError() {
    setTimeout(() => {
      setFormError(formErrorInitialState);
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);

    // navigate("/signin");


    const emailPattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$";
    const phonePattern = "^[0-9]{10}$";
    const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const agePattern = "^(1[0-9]{2}|[1-9][0-9]|100)$";
    const userPattern = "^[A-Za-z0-9_.]{3,20}$";

    let errObjects = { email: "", password: "", age: "", username: "" };

    if (!RegExp(agePattern).test(formData.age)) {
      errObjects.age = "Please enter age between 10 to 100";
    }

    if (!RegExp(userPattern).test(formData.username)) {
      errObjects.username = "Username contain string and number eg shivam123";
    }


if (!passwordPattern.test(formData.password)) {
  errObjects.password =
    "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character";
}

    if (formData.email.includes("@")) {
      if (!RegExp(emailPattern).test(formData.email)) {
        errObjects.email = "Please enter correct E-mail format";
      }
    } else {
      if (!isNaN(formData.email)) {
        if (!RegExp(phonePattern).test(formData.email)) {
          errObjects.email = "Please enter corrent number";
        }
      } else {
        errObjects.email = "Please enter correct format";
      }
    }

    const isObjectEmpty = Object.values(errObjects).every((value) => {
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (!isObjectEmpty) {
      setFormError(errObjects);
      resetError();
    } else {
      // dispatch(addSignin(formData));
      navigate("/signin");
      // setFormData(formInitialState);
      console.log("form success", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let renderAge = ageList.map((v,i) => {
    return (
      <option key={i}>
        {v}
      </option>
    )
  })

  useEffect(() => {
    var ageNumber = [];
      for (let i = 10; i < 100; i++) {
        ageNumber.push(i)
    }
    setAgeList(ageNumber);
  },[]);
  return (
    <Fragment>
      <div className="text-center">
        <h5>SignUp</h5>
      </div>

      <div className="mt-4">
        <form>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <span className="text-danger mt-2">{formError.username}</span>
          </div>
          <div className="form-group mt-2">
            <label>Age</label>
            <select
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
            >
              <option value="" disabled>
                Age
              </option>
              {/* <option>10</option>
              <option>20</option> */}
              {renderAge}
            </select>
            <span className="text-danger mt-2">{formError.age}</span>
          </div>

          <div className="form-group mt-2">
            <label>Email/Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Email/Phone Number"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="text-danger mt-2">{formError.email}</span>
          </div>

          <div className="form-group mt-2">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="text-danger mt-2">{formError.password}</span>
          </div>

          <div className="mt-4 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <button
              type="submit"
              className="btn btn-info mx-2"
            >
              <Link to="/signin" className="nav-link">SignIn</Link>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
