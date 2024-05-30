import { Editor } from "@monaco-editor/react";
import React from "react";

const Popup = ({ text, onClose, language }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
        {/* <p>{text}</p> */}
        <Editor
          defaultValue={text}
          value={text}
          //   height="400px"
          height="70vh"
          width="80vw"
          defaultLanguage="plaintext"
          language={language}
          options={{ readOnly: true }}
        />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default Popup;
