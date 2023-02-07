import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const path = "/";
    navigate(path);
  }

  const { t } = useTranslation();
  return (
    
    <div className="d-flex h-100 title flex-column justify-content-center align-items-center">
      <h1>Log in</h1>
      <form className="w-50 d-flex flex-column gap-5" onSubmit={handleSubmit}>
        <div className="form-floating w-100 mx-auto">
          <input
            type="email"
            className="form-control"
            id="inputEmail3"
            placeholder="Email"
          />
          <label htmlFor="inputEmail3">
            Email
          </label>
        </div>
        <div className="form-floating w-100 mx-auto">
          <input
            type="password"
            className="form-control"
            id="inputPassword3"
            placeholder="Password"
          />
          <label htmlFor="inputPassword3">
            {t("pwd")}
          </label>
        </div>
        <div className="form-group">
            <button type="submit" className="w-100 btn btn-lg colorChange mx-auto">
              {t("signin")}
            </button>
        </div>
      </form>
    </div>
  );
}
