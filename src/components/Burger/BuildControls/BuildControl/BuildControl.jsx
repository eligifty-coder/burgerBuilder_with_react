import React from 'react'
import classes from './BuildControl.css'
const buildControl = ({ label, added, type, removed, disabled})=>{
   let classname = classes.Less
   if(disabled){
      classname=classes.disable
   }
  return <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
     <button className={classname} onClick={() => removed(type)}  >Less</button>
     <button className={classes.More} onClick={() => added(type)}>More</button>
   </div>
}
export default buildControl