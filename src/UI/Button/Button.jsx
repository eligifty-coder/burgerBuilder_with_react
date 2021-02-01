import React from 'react'
import classes from './Button.css'
const button =({children, clicked, btnType, disabled,})=>{
   let classNames=[classes.Button]
   switch(btnType){
      case "Success":
         classNames.push(classes.Success)
         break
      case "Danger":
         classNames.push(classes.Danger)
         break
         default:
         classNames = [classes.Button]
   }
   return (
      <button
      disabled={disabled}
      className={classNames.join(" ")}
      onClick={clicked}
      >
         {children}
      </button>
   )
}
export default button