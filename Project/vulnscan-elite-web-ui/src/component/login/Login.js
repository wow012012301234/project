import "./login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="container login">
      <div className="row login-container">
        <div className="col-5 d-none d-lg-block  right "></div>
        <div className="col left  ">
          <h1 className="login-header"> Login Account</h1>
          <form onSubmit={(e) => e.preventDefault()} className="loginForm">
            <div className="container">
              <div className="row">
                <div className=" col-12  loginInput">
                  <label htmlFor="email"> Email</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    className="email"
                    required
                  />
                  <div className=" col-12 email-cont">
                    <label htmlFor="email"> Password</label>
                    <a href="/#"> forget password?</a>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="pass"
                    required
                  />
                </div>
                <div className=" col-12 checkbox">
                  <input
                    type="checkbox"
                    id="chexbox"
                    name="remember"
                    value=""
                  />
                  <label htmlFor="remember"> Remember me </label>
                </div>
                <div className="col-12">
                  <button type="button" className="sumbit-btn">
                    Login
                  </button>
                </div>
                <div className="col-12">
                  <p> Need an account?</p>

                  <Link to="/signUp">Sign Up </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
