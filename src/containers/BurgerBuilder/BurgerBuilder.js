import React, {Component} from "react"
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import * as actions from '../../store/actions/index'
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Modal from '../../UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import classes from './BurgerBuilder.css'
const INGREDIENT_PRICES={
   salad:0.5,
   cheese:0.4,
   meat:1.3,
   bacon:0.7
}
class BurgerBuilder extends Component{
   state={
      // ingredients:null,
      // totalPrice:4,
      purchasing:false,
      // loading:false,
      // error:false,
   }
   componentDidMount(){
      this.props.onInitIngredients()
      // this.setState({error:false})
      // axios.get('/ingredients.json')
      // .then(res=>{
      //    this.setState({ingredients:res.data})
      // })
      // .catch(error=>{
      //    this.setState({error:true})
      // })
   }
   
   // addIngredientHandler=(type)=>{
   //    let checkType = this.state.ingredients ? [...Object.keys(this.state.ingredients)] : null
   //    checkType.forEach(item=>{
   //       if(type===item){
   //          const oldCOunt = this.state.ingredients[type]
   //          const updatedCount = oldCOunt+1
   //          const updatedIngredient= {...this.state.ingredients}
   //          updatedIngredient[type]=updatedCount
   //          const priceAddition= INGREDIENT_PRICES[type] 
   //          const oldPrice= this.state.totalPrice
   //          const newPrice = priceAddition + oldPrice
   //          this.setState({ingredients:updatedIngredient, totalPrice:newPrice,})
   //       }
   //    })
   // }
   // removeIngredientHandler=(type)=>{
   //    let checkType = this.state.ingredients ? [...Object.keys(this.state.ingredients)] : null
   //    checkType.forEach(item=>{
   //       if(type===item){
   //          const oldCOunt = this.state.ingredients[type]
   //          const updatedCount = oldCOunt - 1
   //          if(oldCOunt<=0){
   //             return
   //          }
   //          const updatedIngredient = { ...this.state.ingredients }
   //          updatedIngredient[type] = updatedCount
   //          const priceDeduction = INGREDIENT_PRICES[type]
   //          const oldPrice = this.state.totalPrice
   //          const newPrice = oldPrice -priceDeduction
   //          this.setState({ ingredients: updatedIngredient, totalPrice: newPrice, })
   //       }
   //    })
   // }
   purchasehandler=()=>{
      if(this.props.isAuthenticated){
         this.setState({purchasing:true,})
      }else{
         this.props.onsetRedirectAuthPath('/checkout')
         this.props.history.push('/auth')
      }
   }
   purchaseCancelHander=()=>{
      this.setState({purchasing:false})
   }
   purchaseContinueHandler=()=>{
      this.props.onInitPurchase();
      this.props.history.push('/checkout');
      // const queryParams =[]
      
      // for(let i in this.state.ingredients){
      //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
      // }
      // // queryParams.push("price="+this.state.totalPrice)
      // const queryString = queryParams.join('&')
      // this.props.history.push({
      //    pathname: '/checkout',
      //    search: '?' + queryString + "&price="+this.state.totalPrice 
         
      // })
      

   }
   render(){
      const ingredients = this.props.ings
      const disabledInfo = { ...this.props.ings }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }
      let validateEmptyBurger = Object.values({ ...disabledInfo })
      console.log(validateEmptyBurger)
      let checkValidate = validateEmptyBurger.every(item => item === true)
      let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
      let orderSummary=null
      if (this.props.ings){
         burger= (
            <Aux>
               <Burger ingredients={ingredients} check={checkValidate} />
               <BuildControls
                  ingredientAdded={this.props.onIngredientAdded}
                  ingredientRemoved={this.props.onIngredientRemoved}
                  disabled={disabledInfo}
                  price={this.props.price}
                  check={checkValidate}
                  isAuth={this.props.isAuthenticated}
                  ordered={this.purchasehandler}
               />
            </Aux>
         )
         orderSummary = <OrderSummary
            ingredients={{ ...this.props.ings }}
            purchaseCancelled={this.purchaseCancelHander}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}
         />
      }
      if(this.state.loading){
         orderSummary=<Spinner/>
      }
      
      return(
         <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
               {orderSummary}
            </Modal>
            {burger}
         </Aux>
      )
   }
}


const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error:state.burgerBuilder.error,
      purchased:state.order.purchased,
      isAuthenticated:state.auth.token,
   }
}
const mapDispatchToProps= dispatch=>{
   return{
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients:()=>dispatch(actions.initIgredient()),
      onInitPurchase: ()=>dispatch(actions.purchaseInit()),
      onsetRedirectAuthPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))