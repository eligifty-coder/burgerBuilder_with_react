import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavigationItems from '../NavigationItems/NavigationItems'
const Toolbar = ({drawerToggleClicked,isAuth})=>{
   return(
      <header className={classes.Toolbar}>
         <DrawerToggle
         clicked={drawerToggleClicked}
         />
         <div className={classes.Logo}><Logo /></div>
         <nav ><NavigationItems isAthenticated={isAuth}/></nav>
      </header>
   )
}
export default Toolbar