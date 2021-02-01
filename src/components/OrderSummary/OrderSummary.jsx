import React, {Component} from 'react'
import Aux  from '../../hoc/Auxillary/Auxillary'
// import classes from './OrderSummary.css'
import Button from '../../components/../UI/Button/Button'
class OrderSummary extends Component {
   componentWillUpdate(){
      console.log('{OrderSummary} will update')
   }
  render(){
      const {ingredients, purchaseCancelled, purchaseContinued, price,} = this.props
      const ingredientSummary = Object.keys(ingredients);
      const summaryList = ingredientSummary.map((item, index) => <li key={index}>
         <span style={{ textTransform: 'Capitalize' }}>
            {item}</span>:{ingredients[item]}
      </li>)
      return (
         <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
               {summaryList}
            </ul>
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
         </Aux>
      )
  }
}
export default OrderSummary
// this component was converted to class based because we wanted to optimize its performance in a class based fashion, we can still leave this component as a functional component and handle