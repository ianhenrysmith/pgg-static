import * as PropTypes from "prop-types"
import React from "react"
import ProductDetail from "../components/productDetail"

import Link from "gatsby-link"

class ProductPage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      productsJson: PropTypes.object.isRequired,
    }),
  }
  render() {
    return (
      <ProductDetail post={this.props.data.productsJson} />
    )
  }
}

export default ProductPage;

export const pageQuery = graphql`
  query ProductPage($slug: String!) {
    ProductsJson(slug: { eq: $slug }) {
      ...ProductDetail_details
    }
  }
`
