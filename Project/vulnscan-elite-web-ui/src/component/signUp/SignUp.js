import { useState } from "react";
import { Link } from "react-router-dom";
import "./signUp.css";
const SignUp = () => {
  let d = Date(Date.now());
  let date = d.toString();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");
  const [aceept, setAccept] = useState(false);
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-/#/$/./%/&/*])(?=.*[a-zA-Z]).{8,12}$/;
  const name_pattern = /^[A-Za-z]\w{2,10}$/;
  function Sumbit(e) {
    e.preventDefault();
    setAccept(true);
  }

  return (
    <div class="container sign-up-body w-100 ">
      <div class="row sign-up-cont ">
        <div class="  col-lg-5 d-none d-lg-block sign-up-left-side ">
          <img
            src={require("./image/reg6.jpg")}
            alt=" signup image"
            className="img-sign-up-aside w-100"
          />
        </div>
        <div class="col-lg-7 col-12  sign-up-right-side ">
          <div className="container sign-up-form ">
            <div className="row sign-up-head">
              <div className="col-12">
                <h3>Create New Account</h3>
              </div>
            </div>
            <div className="row sign-up-head">
              <div className="col">
                <form onSubmit={Sumbit}>
                  <div className="container-fluid">
                    <div className="row sign-up-field">
                      <div className=" col-8 col-lg-4">
                        <div className="col-12">
                          <h5>
                            FirstName<span> *</span>
                          </h5>
                        </div>
                        <div className="col-12">
                          <input
                            type="text"
                            className="name-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {firstName.length === 0 && aceept && (
                            <p>First name is required</p>
                          )}
                          {!name_pattern.test(firstName) &&
                            aceept &&
                            firstName.length > 0 && <p>not valid</p>}
                        </div>
                      </div>
                      <div className="col-8 col-lg-4">
                        <div className="col-12">
                          <h5>
                            Last Name<span> *</span>
                          </h5>
                        </div>
                        <div className="col-12">
                          <input
                            type="text"
                            className="name-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {lastName.length === 0 && aceept && (
                            <p>Last name is required</p>
                          )}
                          {!name_pattern.test(lastName) &&
                            lastName.length > 0 &&
                            aceept && <p>not valid</p>}
                        </div>
                      </div>
                    </div>
                    <div className="row sign-up-field ">
                      <div className="col-12">
                        <h5>
                          Email <span> *</span>
                        </h5>
                      </div>
                      <div className="col-8  ">
                        <input
                          type="text"
                          className="email-input"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      {email.length === 0 && aceept && (
                        <p> Password is requird</p>
                      )}
                      {!email_pattern.test(email) &&
                        aceept &&
                        email.length > 0 && <p>email did'nt match</p>}
                    </div>
                    <div className="row sign-up-field">
                      <div className="col-12">
                        <h5>
                          Password <span> *</span>
                        </h5>
                      </div>
                      <div className="col-8 sign-up-col-10 ">
                        <input
                          type="password"
                          className="pass-input"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                        />
                        {password.length === 0 && aceept && (
                          <p>Password is required</p>
                        )}
                        {!password_pattern.test(password) &&
                          aceept &&
                          password.length > 0 && (
                            <p>
                              not vaild Minimum eight and maximum 10 characters,
                              at least one uppercase letter, one lowercase
                              letter, one number and one special character:
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="row sign-up-field">
                      <div className="col-12">
                        <h5>
                          Confirm Password <span> *</span>
                        </h5>
                      </div>
                      <div className="col-8  ">
                        <input
                          type="password"
                          className="pass-input"
                          value={confpassword}
                          onChange={(e) => setconfpassword(e.target.value)}
                        />
                        {confpassword.length === 0 && aceept && (
                          <p>Password is Required</p>
                        )}
                        {confpassword !== password &&
                          aceept &&
                          confpassword.length > 0 && (
                            <p>Password is not correct </p>
                          )}
                      </div>
                    </div>
                    <div className="row sign-up-field">
                      <div className=" col-8 sign-up-btn ">
                        <button type="submit" className="sub-btn">
                          Create Account
                        </button>
                      </div>
                      <div className="col-lg-8 col-12 mt-2 ms-5">
                        <span>Already have an account?</span>
                        <Link to="/login" className="sign-in">
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
