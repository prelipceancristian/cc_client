import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const FileSaveModal = ({ show, handleClose, handleSubmit, fileExtension }) => {
  const [fileName, setFileName] = useState("file");
  const [community, setCommunity] = useState("");

  const localHandleSubmit = (event) => {
    event.preventDefault();
    handleClose();
    handleSubmit(fileName, community);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={8}>File name</Col>
              <Col>File format</Col>
            </Row>
            <Row>
              <Col xs={8}>
                <Form.Control
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control type="text" disabled value={fileExtension} />
              </Col>
            </Row>
            <Row className="pt-2">
              <Col>
                <Form.Label>Community (optional) </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                >
                  <option value={null}>None</option>
                  <option value="1">Computer science</option>
                  <option value="2">Sesiune</option>
                  <option value="3">Games</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={localHandleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FileSaveModal;
