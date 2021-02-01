import React, {Component} from "react"
import {connect} from 'react-redux'
import classes from './Checkout.css'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData'
import {Route,Redirect} from 'react-router-dom'
import * as actions from '../../store/actions/'
class Checkout extends Component{
   state= {
      ingredients:null,
      totalPrice:0,
   }
   checkoutCancelledHandler=()=>{
      this.props.history.goBack()
   }
   checkoutContinuedHandler=()=>{
      this.props.history.replace('/checkout/contact-data')
   }
   // componentDidMount(){
   //    let price=0
   //    const query= new URLSearchParams(this.props.location.search)
   //    const ingredients={}
   //    for(let param of query.entries()){
   //       if(param[0]==="price"){
   //          price=+param[1]

   //       }else{
   //          ingredients[param[0]]= +param[1]
   //       }
   //    }
   //    this.setState({ingredients:ingredients, totalPrice:price,})
   // }
   render(){
      let summary =null
      if(this.props.ings){
         const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
         console.log(purchasedRedirect)
         summary = (
            <div>
               {purchasedRedirect}
            <CheckoutSummary
               ingredients={this.props.ings}
               checkoutContinued={this.checkoutContinuedHandler}
               checkoutCancelled={this.checkoutCancelledHandler}
            />
            <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
         </div>
         )
      }
      return summary
   }
}
const mapStateToProps= state=>{
   return{
      ings: state.burgerBuilder.ingredients,
      purchased: state.order.purchased,
   }
}
export default connect(mapStateToProps)(Checkout)