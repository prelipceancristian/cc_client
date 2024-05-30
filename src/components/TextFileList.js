import { Fragment, useEffect, useState } from "react";
import {
  retrieveFileContent,
  retrieveFiles,
} from "../controllers/FileController";
import communities from "../constants/Communities";
import Popup from "./Popup";

const formatText = (text) => {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line.split("\t").map((segment, idx) => (
        <Fragment key={idx}>
          {idx > 0 && <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
          {segment}
        </Fragment>
      ))}
      <br />
    </Fragment>
  ));
};

const TextFileList = () => {
  const [files, setFiles] = useState([]);
  const [popupText, setPopupText] = useState("");
  const [popupLanguage, setPopupLanguage] = useState("plaintext");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleFileClick = async (fileName, fileLanguage) => {
    const [success, text] = await retrieveFileContent(fileName);
    if (success) {
      //const formattedText = formatText(text);
      //console.log(formattedText);
      console.log(text);
      setPopupText(text);
      console.log(fileLanguage);
      setPopupLanguage(fileLanguage);
      setIsPopupVisible(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const [success, files] = await retrieveFiles();
      if (success) {
        setFiles(files);
      }
    };
    fetchData();
  }, []);
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>File List</h1>
        <ul style={listStyle}>
          {files.map((file) => (
            <li
              key={file.id}
              onClick={() => handleFileClick(file.name, file.language)}
              style={listItemStyle}
            >
              <div style={listItemContentStyle}>
                <span>
                  <strong>{file.name}</strong> ({file.language})
                </span>
                {file.community_id && (
                  <span style={communityIdStyle}>
                    {communities[file.community_id - 1].name}:{" "}
                    {communities[file.community_id - 1].description}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        {isPopupVisible && (
          <Popup
            text={popupText}
            onClose={() => setIsPopupVisible(false)}
            language={popupLanguage}
          />
        )}
        {/* {selectedFileContent && (
          <div>
            <h2>File Contents</h2>
            <pre>{selectedFileContent}</pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100vh",
  width: "100%",
  backgroundColor: "#f0f0f0",
  paddingTop: "20px",
};

const contentStyle = {
  width: "70%",
  height: "70vh", // Fixed height for the container
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  flexGrow: 1, // Allows the list to grow and take up available space
};

const listItemStyle = {
  cursor: "pointer",
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const listItemContentStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const communityIdStyle = {
  marginLeft: "10px",
  color: "#555",
  fontStyle: "italic",
};

export default TextFileList;
