import React from "react";
import { filter, includes, isEmpty, map } from "lodash";

import Link from "gatsby-link";
import Gx from "gx";

import Product from "../components/product"

class Index extends React.Component {
  state = {}

  handleFilterClick(event, tag) {
    this.setState({ activeFilter: tag })
    event.preventDefault();
    event.stopPropagation();
  }

  handleClearFilter() {
    this.setState({ activeFilter: null })
  }

  renderProduct(product) {
    const clickHandler = (event, tag) => { this.handleFilterClick(event, tag) }
    return (
      <Product key={product.slug}
               onFilterClick={clickHandler}
               product={product}
      />
    )
  }

  renderActiveFilter() {
    if (!isEmpty(this.state.activeFilter)) {
      const clickHandler = () => { this.handleClearFilter() }
      return (
        <div className="active-filters">
          <span>
            showing gift ideas in "{this.state.activeFilter}"
          </span>
          <span className="clear-active-filters" onClick={clickHandler}>
            Show all gift ideas
          </span>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    let { allProductsJson } = this.props.data

    let products = allProductsJson.edges.map(e => e.node)

    if (!isEmpty(this.state.activeFilter)) {
      products = filter(products, (product) => {
        return includes(product.tags, this.state.activeFilter)
      })
    }

    return (
      <div>
        <div className="product-tiles">
          { this.renderActiveFilter() }
          {
            map(products, (product) => { return this.renderProduct(product) })
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
          amazonUrl
          category
          description
          price
          purchaseUrl
          slug
          tags
          title
          ...Product_details
          ...ProductDetail_details
        }
      }
    }
  }
`
