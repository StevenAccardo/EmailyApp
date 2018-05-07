import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      //StripeCheckout defaults to using USD for currency.
      //amount is in US cents, $5 === 500
      //The token prop is a callback
      //For the process.env.REACT_APP_STRIPE_KEY, the actual variable value gets injected into the variable name holder when the application is built.
      //name prop and description prop appear in header of credit card form
      //You can change the style of the swipe default button by creating a child element within it, see below.
      <StripeCheckout name="Emaily" description="$5 for 5 e-mail credits" amount={500} token={token => this.props.handleToken(token)} stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="button-stripe btn-sm btn-primary">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
