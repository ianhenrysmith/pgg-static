import React from "react";
import PropTypes from "prop-types";
import { filter, get, includes, isEmpty, map, take } from "lodash";

import Link from "gatsby-link";
import Header from "../components/header";

import Product from "../components/product";

const PAGE_SIZE = 30;

class Index extends React.Component {
  state = {
    visibleProductCount: PAGE_SIZE,
    allProductCount: this.props.data.allProductsJson.edges.length,
    ...this.getFilterState(),
    ...this.getProducts(PAGE_SIZE)
  }

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

  getProducts(visibleProductCount) {
    let products = this.props.data.allProductsJson.edges.map(e => e.node);
    const activeFilter = get(this, "state.activeFilter");
    // const visibleProductCount = get(this, "state.visibleProductCount", PAGE_SIZE);

    // filter
    if (!isEmpty(activeFilter)) {
      products = filter(products, (product) => {
        return includes(product.tags, activeFilter)
      })
    }
    // paginate
    return { products: take(products, visibleProductCount) };
  }

  handleFilterClick(_, tag) {
    this.setState({ activeFilter: tag })
  }

  handleClearFilter() {
    this.setState({ activeFilter: null })
  }

  handleShowMore() {
    const visibleProductCount = this.state.visibleProductCount + PAGE_SIZE;
    this.setState({
      visibleProductCount,
      ...this.getProducts(visibleProductCount)
    });
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

  renderShowMore() {
    if (this.state.visibleProductCount < this.state.allProductCount) {
      const clickHandler = () => { this.handleShowMore() }
      return <div className="show-more" onClick={ clickHandler }>Show More</div> 
    }
  }

  render() {
    const products = this.state.products;

    if (isEmpty(products)) {
      window.location = "/"
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
            { this.renderActiveFilter() }
          </div>
          { this.renderShowMore() }
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
