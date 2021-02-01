import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart=()=>{
   return{
      type:actionTypes.AUTH_START
   }
}
export const authSuccess=(authData)=>{
   console.log(authData)
   return{
      type:actionTypes.AUTH_SUCCESS,
      authData:authData
   }
}
export const authFail=(error)=>{
   return{
      type:actionTypes.AUTH_FAIL,
      error:error
   }
}
export const logout = ()=>{
   return{
      type:actionTypes.AUTH_LOGOUT,
   }
}
export const checkAuthTimeout = (expirationTime) => {
   return dispatch => {
      setTimeout(()=>{
         dispatch(logout())
      },expirationTime*1000)
   }
}
export const auth = (email, password, isSignup)=>{
   return dispatch=>{
      dispatch(authStart())
      const authData={
         email:email,
         password:password,
         returnSecureToken:true
      }
      let url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAi0wbEN_uJFeO8qpcSRIUluVYMjdqrGqs' :'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAi0wbEN_uJFeO8qpcSRIUluVYMjdqrGqs'
      axios.post(url, authData)
      .then(res=>{
         console.log(res)
         dispatch(authSuccess(res.data))
         dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(error=>{
         console.log(error.message)
         dispatch(authFail(error.response.data.error))
      })

   }
}
export const setAuthRedirectPath=(path)=>{
   return{
      type:actionTypes.SET_AUTH_REDIRECT_PATH,
      path:path,
   }
}