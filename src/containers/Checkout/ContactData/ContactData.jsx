import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../../UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input'
// import * as actions from '../../../store/actions/index'
import * as actions from '../../../store/actions/'
import { Redirect } from 'react-router-dom'
class ContactData extends Component{
   state={
      orderForm:{
         name:{
            elementType:'input',
            elementConfig:{
               type:'text',
               placeholder:'Your Name'
            },
            value:"",
            validation: {
               required: true,
            },
            valid: false,
            touched:false,
         },
         email:{
            elementType:'input',
            elementConfig:{
               type:'email',
               placeholder:'Your E-Mail'
            },
            value:"",
            validation:{
               required:true,
            },
            valid:false,
            touched: false,
         },
         street:{
            elementType:'input',
            elementConfig:{
               type:'text',
               placeholder:'Street'
            },
            value:"",
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         zipCode:{
            elementType:'input',
            elementConfig:{
               type:'text',
               placeholder:'ZIP Code'
            },
            value:"",
            validation: {
               required: true,
               minLength:5,
               maxLength:5,
            },
            valid: false,
            touched: false,
         },
         country:{
            elementType:'input',
            elementConfig:{
               type:'text',
               placeholder:'Country'
            },
            value:"",
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         deliveryMethod:{
            elementType:'select',
            elementConfig:{
               options:[
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' },
               ],
            },
            value:"fastest",
            valid:true,
            validation:{},
         },
      
      },
      formIsValid:false,
   }
   checkValidity=(value, rule)=>{
      // let isValid=false
      // if(rule.required){
      //    isValid = value.trim() !==""
      // }
      // if(rule.minLength){
      //    isValid=value.length>=rule.minLength
      // }
      // if(rule.maxLength){
      //    isValid=value.length<=rule.maxLength
      // }
      // with the series of if, the last if will only be applied to solve this we make isValid =true, then in each of the if statement attach the isvalid=true to each check, the truthy of the last if statement depends on if the previous checks returns true
      // ================== validation:{},============my teacher added this to the state to ensure uniform configuration but i like this if(!rule){return true}
      let isValid=true
      if (rule.required || !rule.required) {
         isValid = value.trim() !== "" && isValid
      }
      if (rule.minLength) {
         isValid = value.length >= rule.minLength && isValid
      }
      if (rule.maxLength) {
         isValid = value.length <= rule.maxLength && isValid
      }
      if (rule.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid
      }
      // if(!rule){ return true }
      return isValid
   }
   orderHandler=(event)=>{
      event.preventDefault();
      this.props.purchased ? alert(2) : alert(1)
      const formData = {};
      for (let formElementIdentifier in this.state.orderForm) {
         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
         ingredients: this.props.ings,
         price: this.props.price,
         orderData: formData
      }
      this.props.onOrderBurger(this.props.token,order)
   }
    ;
   // }
   inputChangedHandler=(event,inputIdentifier)=>{
      const updatedOrderForm={
         ...this.state.orderForm
      }
      const updatedFormElement= {
         ...updatedOrderForm[inputIdentifier]
      }
      updatedFormElement.value = event.target.value
      updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched=true
      updatedOrderForm[inputIdentifier]=updatedFormElement
      let formIsValid=true
      for(let inputIdentifier in updatedOrderForm){
         formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
      }
      console.log(formIsValid)
      this.setState({orderForm:updatedOrderForm, formIsValid:formIsValid,})
   }
   render(){
      const {orderForm} =this.state
      const formElementArray= []
      for (let key in orderForm){
         formElementArray.push({
            id:key,
            config: orderForm[key],
         })
      }
      let form = (<form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement=>(
           <Input
           key={formElement.id}
           id={formElement.id}
           elementType={formElement.config.elementType}
           elementConfig={formElement.config.elementConfig}
           value={formElement.config.value}
           invalid={!formElement.config.valid}
           shouldValidate={formElement.config.validation}
           touched={formElement.config.touched}
           changed={(event) => this.inputChangedHandler(event,formElement.id)}
           />
        ))}
         <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
      </form>)
      if(this.props.loading){
         form=<Spinner/>
      }
      return(
         <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
         </div>
      )
   }
}
const mapStateToPrps = state=>{
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading:state.order.loading,
      purchased: state.order.purchased,
      token:state.auth.token,
   }
}
const mapDispatchToProps = dispatch=>{
   return {
      onOrderBurger: (token,orderData) => dispatch(actions.purchaseBurger(token,orderData)),
   }
}
export default connect(mapStateToPrps, mapDispatchToProps)(withErrorHandler(ContactData, axios))