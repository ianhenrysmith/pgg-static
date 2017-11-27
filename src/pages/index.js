import React from "react";
import { map, chunk } from "lodash";

import Link from "gatsby-link";
import Gx from "gx";

import Product from "../components/product"

class Index extends React.Component {
  renderProduct(product) {
    return (
      <Product
        key={product.slug}
        product={product}
      />
    )
  }

  render() {
    let { allProductsJson } = this.props.data

    const products = allProductsJson.edges.map(e => e.node)
    const renderProduct = (row) => { return this.renderProduct(row) }

    return (
      <div>
        <div className="product-tiles">
          {
            map(products, renderProduct)
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
