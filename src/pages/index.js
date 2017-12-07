import React from "react";
import PropTypes from "prop-types";
import { filter, get, includes, isEmpty, map, take } from "lodash";

import Link from "gatsby-link";
import Header from "../components/header";

import Product from "../components/product";

const PAGE_SIZE = 30;

class Index extends React.Component {
  state = this.getInitialState()

  getInitialState() {
    const activeFilter = this.getFilterState();
    const products = this.getProducts(PAGE_SIZE, activeFilter);
    const allProductCount = this.getProducts(-1, activeFilter).length;

    return ({
      visibleProductCount: PAGE_SIZE,
      allProductCount,
      activeFilter,
      products
    })
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
    return activeFilter;
  }

  getProducts(productLimit, activeFilter) {
    let products = this.props.data.allProductsJson.edges.map(e => e.node);

    // filter
    if (!isEmpty(activeFilter)) {
      products = filter(products, (product) => {
        return includes(product.tags, activeFilter)
      })
    }
    // paginate
    if (productLimit > 0) {
      return take(products, productLimit);
    } else {
      return products;
    }
  }

  handleFilterClick(_, tag) {
    const products = this.getProducts(PAGE_SIZE, tag);

    this.setState({
      activeFilter: tag,
      allProductCount: this.getProducts(-1, tag).length,
      products: products,
      visibleProductCount: products.length
    })
  }

  handleClearFilter() {
    const products = this.getProducts(PAGE_SIZE, null);

    this.setState({
      activeFilter: null,
      allProductCount: this.getProducts(-1, null).length,
      products: products,
      visibleProductCount: products.length
    })
  }

  handleShowMore() {
    const visibleProductCount = this.state.visibleProductCount + PAGE_SIZE;

    this.setState({
      products: this.getProducts(visibleProductCount, this.state.activeFilter),
      visibleProductCount
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

  renderActiveFilter(position) {
    if (!isEmpty(this.state.activeFilter)) {
      const clickHandler = () => { this.handleClearFilter() }
      return (
        <div className={`active-filters-${position}`}>
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
      return (
        <div className="show-more-container">
          <div className="show-more-button" onClick={ clickHandler }>
            Show More
          </div>
        </div>
      )
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
            { this.renderActiveFilter("top") }
            {
              map(products, (product) => { return this.renderProduct(product) })
            }
            { this.renderActiveFilter("bottom") }
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
