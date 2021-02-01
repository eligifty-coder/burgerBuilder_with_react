import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'
const initialState ={
   token:null,
   userId:null,
   loading:false,
   error:null,
   authRedirect:'/',
}
const  authLogout=(state, action)=>{
   return updateObject(state, {token:null, userId:null})
}
const authStart =(state=initialState, action)=>{
   // error should be set to null at the start of any fetch
   return updateObject(state, {error:null, loading:true})
}
const authSuccess=(state, action)=>{
   return updateObject(state, {
      token: action.authData.idToken,
      userId: action.authData.localId,
      loading: false,
      error: null,
   })
}
const authFail= (state, action)=>{
   return updateObject(state, {
      error:action.error,
      loading:false,
   })
}
const setAuthRedirectPath=(state, action)=>{
   return updateObject(state,{authRedirect:action.path})
}
const reducer =(state=initialState, action)=>{
   switch(action.type){
      case actionTypes.AUTH_START: return authStart(state, action)
      case actionTypes.AUTH_SUCCESS:return authSuccess(state,action)
      case actionTypes.AUTH_FAIL: return authFail(state, action)
      case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
      case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
      default: return state
   }
}
export default reducer