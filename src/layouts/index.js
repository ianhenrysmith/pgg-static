import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"

import "./index.css"
import "./style.css"

const Header = () => (
  <div className="header-container">
    <h1><Link to="/">Pretty Good Gifts</Link></h1>
  </div>
)

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Pretty Good Gifts"
      meta={[
        { name: "description", content: "A curated list of some pretty good gifts." },
        { name: "keywords", content: "gifts" },
      ]}
    />
    <Header />
    <div className="body-container">
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
