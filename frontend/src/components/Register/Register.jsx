import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  
  return (
    <div className="d-flex flex-column title vh-75 gap-5 w-100 justify-content-center align-items-center">
      <h1 className="text-center">Register</h1>
      <form className="d-flex flex-column h-100 gap-5 w-50 nee">
        <div className="form-floating w-100 mx-auto">
          <input
            type="text"
            className="form-control h-auto"
            id="name"
            placeholder="Name"
            required
          />
          <label htmlFor="name">{t("username")}</label>
        </div>
        <div className="form-floating w-100 mx-auto">
          <input
            type="email"
            name=""
            id="email"
            className="form-control h-auto"
            placeholder="example@mail.com"
            required
          />
          <label htmlFor="email">E-Mail</label>
        </div>
        <div className="form-floating mx-auto w-100">
          <input
            type="password"
            name=""
            id="password"
            onKeyUp={passwordStrength}
            className="form-control h-auto"
            placeholder="Password"
            required
          />
          <label htmlFor="password">
            {t("pwd")}
          </label>
        </div>
        <div className="form-floating mx-auto w-100">
          <input
            type="password"
            name=""
            id="confirmPwd"
            className="form-control h-auto"
            placeholder="Confirm Password"
            onKeyUp={passwordsMatch}
            required
          />
          <label htmlFor="confirmPwd">
            {t("confirmPwd")}
          </label>
        </div>
        <div className="form-text ms-5">
          <span id="strength" style={{fontWeight: "bolder", color: "greenyellow"}}></span>
        </div>
        <div className="form-text ms-5">
          <span id="match"></span>
        </div>
        <div className="" id="submit">
          <button type="submit" className="w-100 mx-auto  btn btn-lg colorChange">
            {t("register")}
          </button>
        </div>
      </form>
    </div>
  );
}

function passwordsMatch() {
  const match = document.getElementById("match");
  const pwd = document.getElementById("password");
  let confirmPwd = document.getElementById("confirmPwd");
  if (pwd.value !== confirmPwd.value) {
    match.innerHTML = `<span style="color:red">Passwords don't match!</span>`;
  } else {
    match.innerHTML = `<span style="color:green">Passwords match!</span>`;
  }
}

function passwordStrength() {
  var strength = document.getElementById("strength");
  var strongRegex = new RegExp(
    "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
    "g"
  );
  var mediumRegex = new RegExp(
    "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
    "g"
  );
  var enoughRegex = new RegExp("(?=.{8,}).*", "g");
  var pwd = document.getElementById("password");
  if (false === enoughRegex.test(pwd.value)) {
    strength.innerHTML = "At least 8 characters are required!";
  } else if (strongRegex.test(pwd.value)) {
    strength.innerHTML = '<span style="color:green">Strong!</span>';
  } else if (mediumRegex.test(pwd.value)) {
    strength.innerHTML = '<span style="color:orange">Medium!</span>';
  } else {
    strength.innerHTML = '<span style="color:red">Weak!</span>';
  }
}
