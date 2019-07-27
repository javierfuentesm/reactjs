import React from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishdetailComponent.js";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="container">
          <Menu
            dishes={this.state.dishes}
            presiona={dishId => this.onDishSelect(dishId)}
          />
          {/* Se recibe el dishId desde MenuComponent y al momento de recibirlo ejecuta el metodo onDishSelect */}

          <DishDetail
            dish={this.state.dishes.find(
              dish => dish.id === this.state.selectedDish
            )}
          />
        </div>

        <Footer/>
      </div>
    );
  }
}

export default Main;
