import React from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from "react-async-script-loader";
import Loader from '../Loader/Loader'


const CLIENT = {
  sandbox:
    "https://www.paypal.com/sdk/js?client-id=AdmeHDdVieCtGNml2iCNsWqGaWyPW_puc4XIPUifsXXHWXSU8ynPbbLAL5rTgh9rtvnAkztDsHQlZsGw&disable-funding=credit,card,venmo,sepa,bancontact,eps,giropay,ideal,mybank,p24,sofort",
  production:
    "your_production_key"
};

const CLIENT_ID = process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }





  render() {
    const { showButtons, loading } = this.state;

    return (
      <div >
        {loading && (<Loader/>)}
        {showButtons && (
          <PayPalButton
          createOrder={(data, actions) => this.props.createOrder(data, actions)}
          onApprove={(data, actions) => this.props.onApprove(data, actions)}
          onInit={(data, actions) => this.props.onInit(data, actions)}
          onClick={(data, actions) => this.props.onClick(data, actions)}
          onError={(err) => this.props.onError(err)}
          onCancel={(data) => { console.log(data)}}
          />
          )}
      </div>
    );
  }
}

export default scriptLoader(`${CLIENT_ID}`)(PaypalButton);
