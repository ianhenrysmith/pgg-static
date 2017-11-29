import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import "./index.css"
import "./style.css"

let navCallback = () => { console.log("navCallback") }

class TemplateWrapper extends React.Component {
  static childContextTypes = {
    navCallback: PropTypes.func
  }

  getChildContext() {
    return { navCallback: navCallback };
  }

  renderHeader() {
    return (
      <div className="header-container">
        <h1><Link to="/" onClick={navCallback}>Pretty Good Gifts</Link></h1>
      </div>
    )
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
      </div>
    )
  }
}

export default TemplateWrapper
