import TextEditor from "./TextEditor";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import FileSaveModal from "./FileSaveModal";
import languages from "../constants/Languages";

import { useState } from "react";
import { saveFile } from "../controllers/FileController";

const FileCreator = ({ finishSave }) => {
  const [modalShow, setModalShow] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [fileContent, setFileContent] = useState("");

  const handleSubmit = async (fileName, community) => {
    // send request to server
    console.log("Handle sumbit" + fileContent);
    const result = await saveFile(
      fileName,
      fileContent,
      language.id,
      community
    );
    if (result === true) {
      finishSave();
    }
  };

  return (
    <>
      {/* <Navbar className="bg-body-tertiary">
        <Container>File sharing app</Container> */}
      <Container>
        <Button onClick={() => setModalShow(true)} className="w-100">
          Submit
        </Button>
      </Container>
      {/* </Navbar> */}
      <FileSaveModal
        show={modalShow}
        handleShow={() => setModalShow(true)}
        handleClose={() => setModalShow(false)}
        fileExtension={language.extension}
        handleSubmit={handleSubmit}
      ></FileSaveModal>
      {/* some bug here where if i dont change the value of the content the old file content is sent instead */}
      {/* also if the text format is changed, the values are lost. */}
      <TextEditor
        language={language}
        setLanguage={setLanguage}
        setFileContent={setFileContent}
      ></TextEditor>
    </>
  );
};

export default FileCreator;
