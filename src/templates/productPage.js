import * as PropTypes from "prop-types"
import React from "react"

class productPage extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    console.log("render productPage", this.props)
    return (
      <div className="product-page">
        <a href="/">back to main</a>
        <p>This is a productPage</p>
      </div>
    )
  }
}

export default productPage;
