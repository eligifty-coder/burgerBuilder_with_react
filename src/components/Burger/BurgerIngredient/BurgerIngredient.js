import  React, {Component} from 'react'
import classes from './BurgerIngredient.css'
import propTypes from 'prop-types'
class BurgerIngredient extends Component{
   render(){
      const {type} =this.props
      let ingredient = null
      switch (type) {
         case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom} ></div>
            break;
         case ('bread-top'):
            ingredient = (
               <div className={classes.BreadTop} >
                  <div className={classes.Seeds1}></div>
                  <div className={classes.Seeds2}></div>
               </div>
            )
            break;
         case ('meat'):
            ingredient = <div className={classes.Meat} ></div>
            break;
         case ('cheese'):
            ingredient = <div className={classes.Cheese} ></div>
            break;
         case ('bacon'):
            ingredient = <div className={classes.Bacon} ></div>
            break;
         case ('salad'):
            ingredient = <div className={classes.Salad} ></div>
            break;
      }
      return (
         ingredient
      )
   }
}
BurgerIngredient.propTypes={
   type:propTypes.string.isRequired
}
export default BurgerIngredient