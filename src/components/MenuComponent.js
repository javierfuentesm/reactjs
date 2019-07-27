import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

function RenderMenuItem({ dish, presiona }) {
  return (
    <Card onClick={() => presiona(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />

      <CardImgOverlay className="ml-5">
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

//*Menu esta recibiendo con props en la declaracion de la funcion asi ya no hay que poner this.props lo que hace como la
//otra function no se le manda props , function Menu manda a su vez estos valores que vienen desde Main component -> Menu ->RenderMenuItem
const Menu = props => {
  const menu = props.dishes.map(dish => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} presiona={props.presiona} />
      </div>
    );
  });

  return <div className="row">{menu}</div>;
};

export default Menu;
