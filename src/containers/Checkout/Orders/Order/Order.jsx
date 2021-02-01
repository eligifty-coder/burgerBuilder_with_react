import React from 'react'
import classes  from './Order.css'
const Order =({price, ingredients})=>{
   const ingredient=[]
   for(let ingredientName in ingredients){
      ingredient.push(ingredientName)
   }
   const ingredientOutput= ingredient.map(ig=>(
      <span style={{
         textTransform:'capitalize',
         display:"inline-block",
         margin :'0 8px',
         border:'1px solid #ccc',
         padding: '5px'
      }} 
      key={ig}>{ig} ({ingredients[ig]}) </span>
   ))
   return (
      <div className={classes.Order}>
         <p> Ingredients : {ingredientOutput} </p>
         <p>Price : <strong> USD {Number.parseFloat(price.toFixed(2))}</strong></p>
      </div>
   )
}
export default Order