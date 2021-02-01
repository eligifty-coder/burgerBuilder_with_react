import * as actionTypes from '../actions/actionTypes'
import { updateObject} from '../utility'
const initialState = {
   ingredients:null,
   error:false,
   totalPrice: 4,
   building:false
}
const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.4,
   meat: 1.3,
   bacon: 0.7
}
const addIngredient = (state, action)=>{
   const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
   const updatedIngredients = updateObject(state.ingredients, updateIngredient)
   const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      building:true,
   }
   return updateObject(state, updatedState)
}
const removeIngredient= (state, action)=>{
   if (state.ingredients[action.ingredientName] < 1) {
      const ing = { [action.ingredientName]: 0 }
      const ings = updateObject(state.ingredients, ing)
      const st = { ingredients: ings }
      return updateObject(state, st)
   }
   const updateIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
   const updateIngs = updateObject(state.ingredients, updateIng)
   const updatedSt = {
      ingredients: updateIngs,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
   }
   return updateObject(state, updatedSt)
}
const setIngredients=(state, action)=>{
   return updateObject(state, {
      ingredients: { ...action.ingredients },
      error: false,
      totalPrice: 4,
      building:false,
   })
}
const setIngredientsFaileed=(state, action)=>{
   updateObject(state, { error: true })
}
const reducer=(state=initialState, action)=>{
   switch(action.type){
      case actionTypes.ADD_INGREDIENT:
        return addIngredient(state, action)

      case actionTypes.REMOVE_INGREDIENT:
         return removeIngredient(state,action)
      case actionTypes.SET_INGREDIENTS:
         return setIngredients(state, action)
      case actionTypes.FETCH_INGREDIENTS_FAILED:
         return setIngredientsFaileed(state, action)
      default:
         return state
   }
   
}
export default reducer