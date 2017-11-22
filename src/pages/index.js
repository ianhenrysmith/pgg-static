import React from "react";
import _ from "lodash";
// import * as PropTypes from "prop-types"

import Link from "gatsby-link";
import Product from "../components/product"

class Index extends React.Component {
  render() {
    let { allProductsJson } = this.props.data

    const products = allProductsJson.edges.map(e => e.node)

    return (
      <div>
        <h1>Products</h1>
        {
          _.map(products, (product) => {
            return (
              <Product
                key={product.slug}
                product={product}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query AllProductsQuery {
    allProductsJson {
      edges {
        node {
          slug
          title
          image_url
          ...Product_details
          ...ProductDetail_details
        }
      }
    }
  }
`
