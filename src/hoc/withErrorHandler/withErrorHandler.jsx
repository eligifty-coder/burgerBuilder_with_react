import React , {Component}from 'react'
import Modal from '../../UI/Modal/Modal'
import Aux from '../Auxillary/Auxillary'
const withErrorHandler=(WrappedComponent, axios)=>{
   return class extends Component{
      constructor(props){
         super(props)
         this.state={
            error:null
         }
         this.reqInterceptor=axios.interceptors.request.use(request => {
            this.setState({ error: null })
            return request
         }, null)
         this.resInterceptor=axios.interceptors.response.use(res => res, error => {
            this.setState({ error: error })
            return Promise.reject(error)
         })
      }
      componentWillUnmount(){
         console.log("will Unmount", this.reqInterceptor, this.resInterceptor)
         axios.interceptors.request.eject(this.reqInterceptor)
         axios.interceptors.response.eject(this.resInterceptor)
      }
      // use componentwillmount  . this is more effective cos it run before the child component which is wrappedcomponent renders unlike componentdid mount that which runs after render.... since you are  not causing sie effectyou can also use constructor in place of componentwillmount
      // componentWillMount(){
      //    axios.interceptors.request.use(request=>{
      //       this.setState({error:null})
      //       return request
      //    },null)
      //    axios.interceptors.response.use(res=>res,error=>{
      //       this.setState({error:error})
      //       return Promise.reject(error)
      //    })
      // }
      // componentDidMount(){
      //    axios.interceptors.request.use(request=>{
      //       this.setState({error:null})
      //       return request
      //    },null)
      //    axios.interceptors.response.use(res=>res,error=>{
      //       this.setState({error:error})
      //       return Promise.reject(error)
      //    })
      // }
      errorConfirmedHandler=()=>{
         this.setState({error:null})
      }
      render(){
         return (
            <Aux>
               <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                  {this.state.error? this.state.error.message:null}
            </Modal>
               <WrappedComponent {...this.props} />
            </Aux>
         )
      }
   }
}
export default withErrorHandler