import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const buildControls = ({ ingredientAdded, ingredientRemoved, disabled, price, check, ordered, isAuth,})=>{
   const controls= [
      {label:"Salad", type:"salad"},
      {label:"Bacon", type:"bacon"},
      {label:"Cheese", type:"cheese"},      {label:"Meat", type:"meat"}
   ]
   return(
      <div className={classes.BuildControls}>
         <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
         {controls.map(ctrl=>(
            <BuildControl
            label={ctrl.label}
            key={ctrl.label}
            added={ingredientAdded}
            removed={ingredientRemoved}
            type={ctrl.type}
            disabled={disabled[ctrl.type]}
            />
         ))}
         <button
         className={classes.OrderButton} 
         disabled={check}
         onClick={ordered}
         >
           {isAuth? "ORDER NOW":"SIGN UP TO ORDER"}
         </button>
      </div>
   )
}
export default buildControls