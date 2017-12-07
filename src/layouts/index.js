import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import "./index.css"
import "./style.css"

class TemplateWrapper extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Helmet
          title="Pretty Good Gifts"
          meta={[
            { name: "description", content: "A curated list of some pretty good gifts." },
            { name: "keywords", content: "gifts" },
          ]}
        />
        {this.props.children()}
        <div className="footer-container"></div>
      </div>
    )
  }
}

export default TemplateWrapper
