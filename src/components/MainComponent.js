import React from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishdetailComponent.js';


class Main extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      selectedDish:null
    };
  }
   

  onDishSelect(dishId){
        
    this.setState({selectedDish:dishId});
}

  render(){

    return (
      <div>
  
        <Navbar dark color="primary">
  
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>

        <div className="container">
        <Menu dishes={this.state.dishes}
        onClick={(dishId)=>this.onDishSelect(dishId)} />
    {/* Se recibe el dishId desde MenuComponent y al momento de recibirlo ejecuta el metodo onDishSelect */}
        
        <DishDetail dish={this.state.dishes.filter((dish)=>dish.id===this.state.selectedDish)[0]} />
        </div>
      </div>
    );

  }

}

export default Main;
