import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";


  
  function RenderDish({dish}) {
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
    } else return <div/>;
  }

 function RenderComments({selectedDish}) {
    if (selectedDish != null) {
      const comments = selectedDish.comments.map(comment => {
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
          {comments}
        </div>
      );
    } else return <div />;
  }


  const DishDetail=(props)=> {


    return (
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments selectedDish={props.dish}/>

      </div>
    );
  }

export default DishDetail;
