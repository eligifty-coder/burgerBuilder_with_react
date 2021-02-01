import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './SideDrawer.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import  Aux from '../../../hoc/Auxillary/Auxillary'
const sideDrawer = ({showSideDrawer, closed,isAuth,})=>{
   let attachedClasses = [classes.SideDrawer]
   showSideDrawer? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close)
   return(
      <Aux>
         <Backdrop clicked={closed} show={showSideDrawer}/>
         <div className={attachedClasses.join(" ")}>
            <div className={classes.Logo}><Logo /></div>
            <nav>
               <NavigationItems isAthenticated={isAuth} />
            </nav>
         </div>
      </Aux>
   )
}
export  default sideDrawer