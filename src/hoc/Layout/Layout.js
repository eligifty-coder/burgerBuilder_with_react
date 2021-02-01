import React, {Component} from 'react'
import Auxillary from '../Auxillary/Auxillary'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component{
  state={
    showSideDrawer:false,
  }
  sideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer:false})
  }
  sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
   render(){
     const {children}= this.props
    return (
      <Auxillary>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
        isAuth={this.props.isAuthenticated}
        showSideDrawer={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{children}</main>
      </Auxillary>
    )
   }
}
const mapStateToProps = state=>{
  return{
    isAuthenticated:state.auth.token
  }
}
export default connect(mapStateToProps)(Layout)