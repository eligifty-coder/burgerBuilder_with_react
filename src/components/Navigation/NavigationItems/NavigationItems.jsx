import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from  './NavigationItem/NavigationItem'
const NavigationItems = ({isAthenticated,})=>(
   <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      {isAthenticated?
         <NavigationItem link='/orders' >Orders</NavigationItem>:
         null
      }
     {isAthenticated?
         <NavigationItem link='/logout' >Logout</NavigationItem>:
         <NavigationItem link='/auth' >Authenticate</NavigationItem>
     }
   </ul>
)
export default NavigationItems