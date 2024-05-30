import { useState } from "react";
import FileCreator from "./components/FileCreator";
import TextFileList from "./components/TextFileList";
import { Container, Navbar } from "react-bootstrap";

const App = () => {
  //const email = "prelipceancristian100@gmail.com";
  const [screenState, setScreenState] = useState(0);

  const finishSave = () => {
    setScreenState(1);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <div style={titleStyle}>
          <h1>File sharing app 2.0</h1>
        </div>
      </Navbar>
      {screenState === 0 ? (
        <FileCreator finishSave={finishSave}></FileCreator>
      ) : (
        <></>
      )}
      {screenState === 1 ? <TextFileList></TextFileList> : <></>}
    </>
  );
};

const titleStyle = {
  marginLeft: "auto",
  marginRight: "auto",
};

export default App;
