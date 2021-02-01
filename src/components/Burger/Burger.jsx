import React from 'react'
import classes from './Burger.css'
import {withRouter} from 'react-router-dom'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = ({ ingredients,check, history, location,match})=>{
   let transformedIngredients = Object.keys(ingredients)
   .map(igKey=>{
      return [...Array(ingredients[igKey])].map((empty,i)=>{
         return <BurgerIngredient type={igKey} key={igKey +  i}/>
      })
   })
   if(check){
      transformedIngredients=<p className={classes.BurgerText}>Please start adding ingredients!</p>
   }
  return <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
   </div>
}
export default withRouter(burger)