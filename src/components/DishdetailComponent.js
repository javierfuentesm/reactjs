import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = val => val && val.length;
const maxlength = len => val => !val || val.length <= len;
const minlength = (len) => (val) => val && (val.length >= len);

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
    this.toggleModal();
    this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
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


function RenderDish({ dish }) {
  if (dish != null) {

    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else return <div />;
}

function RenderComments({ comments,addComment,dishId }) {
  if (comments != null) {
    const comments2 = comments.map((comment) => {
      return (
        <ul key={comment.id} className="list-unstyled">
          <li>{comment.comment}</li>
          <li>
            --{comment.author},
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </ul>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {comments2}

        <br></br>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>

 

    );
  } else return <div />;
}

const DishDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
         
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name} </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments}  addComment={props.addComment} dishId={props.dish.id} />
      </div>
    </div>
  );
};

export default DishDetail;
