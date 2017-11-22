import React from "react";
import _ from "lodash";
// import * as PropTypes from "prop-types"

import Link from "gatsby-link";

import productsData from "../../data/products.json"

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
              <div className="product-link">
                <Link to={`/${product.slug}`}>{product.title}</Link>
              </div>
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
        }
      }
    }
  }
`
