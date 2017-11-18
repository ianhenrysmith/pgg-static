import * as PropTypes from "prop-types"
import React from "react"

class productPage extends React.Component {
  static propTypes = {
    pathContext: PropTypes.object
  }

  render() {
    const product = this.props.pathContext.product;

    return (
      <div className="product-page">
        <a href="/">back to main</a>
        <p>This is a productPage, here is a product:</p>
        <p>title: {product.title}</p>
        <p>slug: {product.slug}</p>
      </div>
    )
  }
}

export default productPage;
