import React from "react";
import PropTypes from "prop-types";
import { filter, includes, isEmpty, map, get } from "lodash";

import Link from "gatsby-link";
import Header from "../components/header";

import Product from "../components/product";

class Index extends React.Component {
  state = this.getFilterState()

  getFilterState() {
    const search = this.props.location.search
    const params = search.split("?")[1];
    let activeFilter = null;

    if (!isEmpty(params)) {
      const filterParam = params.split("activeFilter=")[1];
      if (!isEmpty(filterParam)) {
        activeFilter = filterParam;
      }
    }
    return { activeFilter };
  }

  handleFilterClick(_, tag) {
    this.setState({ activeFilter: tag })
  }

  handleClearFilter() {
    this.setState({ activeFilter: null })
  }

  renderHeader() {
    const clickHandler = () => { this.handleClearFilter() }
    return <Header onClick={clickHandler} />
  }

  renderProduct(product) {
    const clickHandler = (event, tag) => { this.handleFilterClick(event, tag) }
    return (
      <Product key={product.slug}
               onFilterClick={clickHandler}
               product={product}/>
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
          <Link className="clear-active-filters"
                onClick={clickHandler}
                to={ "/" }>
            Show all gift ideas
          </Link>
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
        { this.renderHeader() }
        <div className="body-container">
          <div className="product-tiles">
            { this.renderActiveFilter() }
            {
              map(products, (product) => { return this.renderProduct(product) })
            }
          </div>
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
