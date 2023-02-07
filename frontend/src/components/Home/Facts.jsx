import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as jokeApi from "../../api/jokes";

export default function Facts() {
  const defaultData = jokeApi.getAll();
  const [question, setQuestion] = useState(defaultData[0]);
  const [answer, setAnswer] = useState(defaultData[1]);
  const {t} = useTranslation();

  

  useEffect(() => {
    const refresh = () => {
      try {
        const data = jokeApi.getAll();
        setQuestion(data[0]);
        setAnswer(data[1]);
        
      } catch (error) {
        console.error(error);
      }
    };
      setInterval(() => refresh(), 10000);
  },[]);

  return (
    <>
      <div className="container text-center p-5" style={{fontSize: "24px", fontWeight: "bold"}}>
        <h1>{t('jokes')}</h1>
        <p id="question">{question}</p>
        <p id="answer">{answer}</p>
      </div>
    </>
  );
}
