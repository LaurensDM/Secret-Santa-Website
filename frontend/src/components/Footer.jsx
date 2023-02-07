import ReactAudioPlayer from "react-audio-player";
import music from "../music/Slower_Version-2020-12-16_-_Christmas_Rock_-_www.FesliyanStudios.com_Steve_Oxen.mp3";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className="text-center mt-auto">
        <div className="container p-4 pb-0">
          <section>
            <p className="d-flex justify-content-center align-items-center">
              {t("footer1")}
            </p>
          </section>
          <section>
            <ReactAudioPlayer src={music} controls loop={true} volume={0.1} />
          </section>
        </div>
        <div className="text-center">
          <a
            className="link-secondary"
            href="https://www.vecteezy.com/free-vector/christmas-background"
            target={"_blank"}
            rel="noreferrer"
          >
            Christmas Background Vectors by Vecteezy
          </a>
        </div>
      </footer>
    </>
  );
}
