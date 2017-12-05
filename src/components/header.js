import React from "react";
import PropTypes from "prop-types";

import Link from "gatsby-link";

class Header extends React.Component {
  static propTypes = {
    onClick: PropTypes.func
  }

  render() {
    return (
      <div className="header-container">
        <h1><Link to="/" onClick={this.props.onClick}>Pretty Good Gifts</Link></h1>
      </div>
    )
  }
}

export default Header
