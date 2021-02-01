import React, {Component} from 'react'
import classes from './Orders.css'
import Order from '../Orders/Order/Order'
import axios from '../../../axios-orders'
import {connect} from 'react-redux'
import * as actions from './../../../store/actions/'
import Spinner from '../../../UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component{
   componentDidMount(){
      this.props.onFetchOrders(this.props.token)
   }
   render(){
      let orders= <Spinner/>
      if(!this.props.loading){
         orders = this.props.orders.map(order => {
                  return (
                  <Order
                     key={order.id}
                     ingredients={order.ingredients}
                     price={order.price}
                  />
               )
            })
      }
      return(
         <div>
            {orders}
         </div>
      )
   }
}
const mapStateToProps= state=>{
   return{
      orders: state.order.orders,
      loading: state.order.loading,
      token: state.auth.token,
   }
}
const mapDispatchToProps=dispatch=>{
   return{
      onFetchOrders:(token)=>{
         return dispatch(actions.fetchOrders(token))
      }
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios))