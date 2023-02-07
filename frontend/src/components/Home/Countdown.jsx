import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import * as countdownApi from "../../api/countdown";

export default function Countdown() {
  const [time, setTime] = useState({...countdownApi.timeUntilChristmas()});
  const {t} = useTranslation();

  const refresh = useCallback(async () => {
    try {
      const data = countdownApi.timeUntilChristmas();
      setTime(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    refresh();
    setInterval(() => refresh(), 1000);
  },[refresh]);

  return (
    <>
      <div className="font-christmas jumbotron">
        
        <div className="text-center">
          <p className="largerFont">{t('countdown1')}</p>
            <div className="changeDirection fw-bold d-flex gap-3 justify-content-center">
              <div className="text-center" >
                <p className="font" >{time.days}</p>
                <p className="largerFont">
                  {t('days')}
                </p>
              </div>
              <div className="text-center">
                <p className="font">{time.hours}</p>
                <p className="largerFont">
                  {t('hours')}
                </p>
              </div>
              <div className=" text-center">
                <p className="font">{time.minutes}</p>
                <p className="largerFont">
                  {t('min')}
                </p>
              </div>
              <div className="text-center">
                <p className="font">{time.seconds}</p>
                <p className="largerFont">
                  {t('sec')}
                </p>
              </div>
            </div>
          <p className="largerFont">{t('countdown2')}</p>
        </div>
        
      </div>
    </>
  );
}
