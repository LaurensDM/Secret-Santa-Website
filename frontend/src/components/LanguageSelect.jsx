import React, { useEffect, useState } from "react";
import i18next from "i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  nl: { label: "Nederlands", dir: "ltr", active: false },
};

export default function LanguageSelect() {
  let selected = localStorage.getItem("i18nextLng")
    ? localStorage.getItem("i18nextLng")
    : "en";
  if (selected.includes("nl")) {
    selected = "nl";
  } else {
    selected = "en";
  }

 
  const [label, setLabel] = useState("");

  useEffect(() => {
    document.body.dir = languageMap[selected].dir;
    setLabel(languageMap[selected].label);
  }, [selected, label]);

  return (
    <Dropdown className="m-1">
      <DropdownButton
        variant="default"
        menuVariant="dark"
        id="dropdown-basic"
        title={label}
        align="end"
      >
        {Object.keys(languageMap)?.map((item) => (
          <Dropdown.Item
            key={item}
            className="me-5 text-center"
            onClick={() => {
              i18next.changeLanguage(item);
              setLabel(item);
            }}
          >
            {languageMap[item].label}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Dropdown>
  );
}
