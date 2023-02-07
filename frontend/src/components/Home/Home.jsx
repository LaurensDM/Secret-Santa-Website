import { useTranslation } from "react-i18next";
import Countdown from "./Countdown";
import Facts from "./Facts";
import * as countdownApi from "../../api/countdown";

export default function Home() {
  const { t } = useTranslation();
  const title = () => {
    const days = countdownApi.timeUntilChristmas().days;
    let string;
    if (days < 60) {
      string = "homeTitle1";
    } else if (days >= 60 && days <= 120) {
      string = "homeTitle4";
    } else {
      string = "homeTitle3";
    }
    if (countdownApi.timeUntilChristmas().christmas) {
      string = "homeTitle2"
    }
    return string;
  };
  return (
    <>
      <div className="home">

        <div className="title">
          <h1 className="fw-bolder text-center" style={{ color: "red", fontSize: "50px" }}>
            {t(title())}
          </h1>
        </div>
        <br />
        <div style={{ marginBottom: "15%" }}>
          <Countdown />
        </div>
        <br />
        <div style={{ marginBottom: "15%" }} className="jumbotron">
          <Facts />
        </div>
      </div>
    </>
  );
}
