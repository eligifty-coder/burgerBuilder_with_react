import React, {Component} from 'react'
import classes from './Modal.css'
import Aux from '../../hoc/Auxillary/Auxillary'
import Backdrop from '../Backdrop/Backdrop'
import { render } from 'react-dom'
class Modal extends Component{
   shouldComponentUpdate(nextProps, nextState,){
      // if(nextProps.show !==this.props.show){
      //    return true
      // } 
      // ===============this method above or the method below
      return nextProps.show !== this.props.show || nextProps.children !== this.props.children
   }
   componentWillUpdate(){
      console.log('Modal willUpdate')
   }
   render(){
      const {children, show, modalClosed, }=this.props
      return (
         <Aux>
            <div
               className={classes.Modal}
               style={{
                  transform: show ? "translateY(0)" : "translateY(-100vh)",
                  opacity: show ? '1' : '0'
               }}
            >
               {children}
            </div>
            <Backdrop show={show} clicked={modalClosed} />
         </Aux>
      )
   }
}
export default Modal