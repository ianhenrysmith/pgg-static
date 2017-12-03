import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import SubscribeForm from "react-mailchimp-subscribe";

import "./index.css"
import "./style.css"

let navCallback = null;
let registerCallback = (callback) => { navCallback = callback }
let deregisterCallback = () => { navCallback = null }

class TemplateWrapper extends React.Component {
  static childContextTypes = {
    deregisterCallback: PropTypes.func,
    registerCallback: PropTypes.func
  }

  getChildContext() {
    return { registerCallback, deregisterCallback };
  }

  runCallbacks(event) {
    if (typeof(navCallback) === "function") {
      navCallback(event)
    }
  }

  renderHeader() {
    const clickHandler = (event) => { this.runCallbacks(event) }
    return (
      <div className="header-container">
        <h1><Link to="/" onClick={clickHandler}>Pretty Good Gifts</Link></h1>
      </div>
    )
  }

  renderSubscribeForm() {
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

    return <SubscribeForm {...formProps}/>
  }

  render() {
    return (
      <div>
        <Helmet
          title="Pretty Good Gifts"
          meta={[
            { name: "description", content: "A curated list of some pretty good gifts." },
            { name: "keywords", content: "gifts" },
          ]}
        />
        { this.renderHeader() }
        <div className="body-container">
          {this.props.children()}
        </div>
        <div className="footer-container">
          {this.renderSubscribeForm()}
        </div>
      </div>
    )
  }
}

export default TemplateWrapper
