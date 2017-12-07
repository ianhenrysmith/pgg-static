import React from "react";

import SubscribeForm from "react-mailchimp-subscribe";

class SubscribeArea extends React.Component {
  render() {
    const formProps = {
      action: "https://gifts.us17.list-manage.com/subscribe/post?u=11ab56c29bb4a46b3d75765e9&amp;id=257208557b",
      messages: {
        inputPlaceholder: "email address",
        btnLabel: "Subscribe",
        sending: "Subscribing...",
        success: "Thank you for subscribing!",
        error: "Oops, couldn't subscribe..."
      },
      styles: {
        sending: {
          fontSize: 18,
          color: "auto"
        },
        success: {
          fontSize: 18,
          color: "green"
        },
        error: {
          fontSize: 18,
          color: "red"
        }
      }
    }

    return (
      <div className="subscribe-container">
        <SubscribeForm {...formProps}/>
      </div>
    )
  }
}

export default SubscribeArea
