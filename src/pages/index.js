import React from "react";
import _ from "lodash";

import Link from "gatsby-link";
import Gx from "gx";

import Product from "../components/product"

class Index extends React.Component {
  renderProduct(product) {
    return (
      <Gx col={4} breakpoint={768}>
        <Product
          key={product.slug}
          product={product}
        />
      </Gx>
    )
  }

  renderRow(productRow) {
    const renderFn = (product) => { return this.renderProduct(product) }
    return (
      <div className="product-row">
        {
          _.map(productRow, renderFn)
        }
      </div>
    )
  }

  render() {
    let { allProductsJson } = this.props.data

    const products = allProductsJson.edges.map(e => e.node)
    const renderFn = (row) => { return this.renderRow(row) }

    return (
      <div>
        <h1>Products</h1>
        <div className="product-tiles">
          {
            _.map(_.chunk(products, 3), renderFn)
          }
        </div>
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
