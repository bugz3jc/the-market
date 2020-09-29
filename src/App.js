import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Home from "./pages/index";
import PageNotFound from "./pages/error404";
import Profile from "./pages/profile";
import Shop from "./pages/shop";
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
import ButtonAppBar from './components/navigation';
import Footer from './components/footer'; 
import { CssBaseline } from '@material-ui/core';

let theme = createMuiTheme({
  state:{
    textColor:{
      light: 'rgba(255,255,255,0.8)',
      dark: 'rgba(0,0,0,0.8)'
    },
    hoverTextColor:{
      light: 'rgba(255,255,255,0.4)',
      dark: 'rgba(0,0,0,0.4)'
    }
  }
});
theme = responsiveFontSizes(theme);

class App extends Component{
  constructor(props){
    super(props);

    
    this.handleChange = this.handleChange.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.state ={
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
    };

   
  }
  handleChange(data) {
    let cartItems = [...this.state.cartItems];
    cartItems.push(data);
    this.setState({cartItems: cartItems});
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  }
  removeCartItem(index) {
    let cartItems = [...this.state.cartItems];
    cartItems.splice(index,1);
    this.setState({cartItems: cartItems});
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  }
  changeQuantity(index, mode){
    let cartItems = [...this.state.cartItems];
    let cartItem = cartItems[index];
    switch (mode){
      case 'plus':
        if(cartItem.quantity < cartItem.available_quantity) cartItem.quantity++;
        break;
      case 'minus':
        if(cartItem.quantity > 1) cartItem.quantity--;
        break;
        default: 
        break;
    }
    this.setState({cartItems: cartItems});
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  }
  render() {
    return(
    <React.Fragment>
      <CssBaseline />
    <Router>
      <ThemeProvider theme={theme}>
        <ButtonAppBar cart={this.state.cartItems}/>
      </ThemeProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/shop/:id" render={(props) => <ProductDetail onCartAdd={this.handleChange} cartItems={this.state.cartItems}/>} />
        <Route exact path="/cart" render={(props) => <Cart cartItems={this.state.cartItems} onCartRemove={this.removeCartItem} changeQuantity={this.changeQuantity} /> }  />
        <Route exact path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
      
      <Footer />
    </Router>
    </React.Fragment>
    )
  }
}

export default App;
