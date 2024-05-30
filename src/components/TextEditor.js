import { Editor } from "@monaco-editor/react";
import { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import languages from "../constants/Languages";

const themes = [
  {
    name: "Default",
    id: "light",
  },
  {
    name: "Dark",
    id: "vs-dark",
  },
];

const TextEditor = ({ language, setLanguage, setFileContent }) => {
  const handleLanguageChange = (languageName) => {
    let languageIndex = languages.findIndex((l) => l.name === languageName);
    // fallback
    if (languageIndex === -1) {
      languageIndex = 0;
    }
    setLanguage(languages[languageIndex]);
  };

  const handleThemeChange = (themeName) => {
    let themeIndex = themes.findIndex((t) => t.name === themeName);
    console.log(themeIndex);
    // fallback
    if (themeIndex === -1) {
      themeIndex = 0;
    }
    setTheme(themes[themeIndex]);
  };

  const [theme, setTheme] = useState(themes[0]);
  return (
    <Container>
      <Row>
        <Col>Text format</Col>
        <Col>Theme</Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <select
            style={{ width: "100%" }}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.id}>{lang.name}</option>
            ))}
          </select>
        </Col>
        <Col>
          <select
            style={{ width: "100%" }}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            {themes.map((th) => (
              <option key={th.id}>{th.name}</option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Editor
          height="70vh"
          width="80vw"
          defaultValue={languages[0].example}
          defaultLanguage={languages[0].id}
          language={language.id}
          value={language.example}
          theme={theme.id}
          onChange={(x) => {
            console.log("Setting up" + x);
            setFileContent(x);
          }}
        />
      </Row>
    </Container>
  );
};

export default TextEditor;
