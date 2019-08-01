import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row,
  Col
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxlength = len => val => !val || val.length <= len;
const minlength = len => val => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    console.log("Current state is" + JSON.stringify(values));
    alert("Current state is" + JSON.stringify(values));
  }

  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> {""}
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
            <ModalBody>
              <Row className="form-group">
                <Label htmlFor="rating" sm={12}>
                  Rating
                </Label>
                <Col sm={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="author" sm={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minlength: minlength(3),
                      maxlength: maxlength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minlength: "Must be greater than 2 characters",
                      maxlength: "Must  be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" sm={12}>
                  Comment
                </Label>
                <Col sm={12}>
                  <Control.textarea
                    className="form-control"
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </ModalBody>
          </LocalForm>
        </Modal>
      </div>
    );
  }
}
export default CommentForm;
