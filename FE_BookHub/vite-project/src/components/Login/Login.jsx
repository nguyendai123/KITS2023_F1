import { redirect } from "react-router-dom";
import bg from "../../assets/bg-login.svg";
import Cookies from "js-cookie";

import { useState } from "react";
import "./Login.scss";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitSuccuss = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    return redirect("/");
  };

  const onSubmitFailure = () => {
    setShowSubmitError(true);
    setErrorMsg("Username or Password is Invalid");
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const userDetails = { username, password };
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccuss(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return redirect("/");
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="login-form-container"
      >
        <div className="left-content-login">
          <img
            src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
            alt="website logo"
            className="login-website-logo-desktop-image"
          />
          <div className="bookhub-des-login">
            BookHub helps people share books, join discussions, discover new
            books, and connect with readers.
          </div>
        </div>

        <div className="form-main-container">
          <form className="form-container" onSubmit={(e) => onSubmitForm(e)}>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="username">
                  Username*
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => onChangeUsername(e)}
                />
              </>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
            <div className="input-container">
              <>
                <label className="input-label" htmlFor="password">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                />
              </>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}
            <a href="#" className="forgot-pw">
              Forgot password
            </a>
            <div className="space-login"></div>
            <button className="register-button">Register</button>
          </form>
        </div>
      </div>
      <div className="footer-login">
        <div className="tran-login">
          <div>English (UK)</div>
          <div>Tiếng Việt</div>
        </div>
        <div>Copyright @2023</div>
      </div>
    </>
  );
};
export default Login;
