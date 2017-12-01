import React from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"

import { map, isEmpty } from "lodash"

class ProductDetail extends React.Component {
  static contextTypes = {
    deregisterCallback: PropTypes.func
  }

  componentWillMount() {
    this.context.deregisterCallback()
  }

  renderPurchaseButton() {
    const { amazonUrl, purchaseUrl } = this.props.product;

    if (!isEmpty(amazonUrl)) {
      return <a className="purchase-button amazon-url" href={amazonUrl}>Buy on Amazon</a>
    } else {
      return <a className="purchase-button generic-url" href={purchaseUrl}>View in Store</a>
    }
  }

  render() {
    const {
      bigImage,
      category,
      description,
      price,
      slug,
      tags,
      title,
    } = this.props.product

    const { big } = bigImage.childImageSharp

    return (
      <div className="product-page-container">
        <div className="product-page">
          <div className="product-page-title-container">
            <Link to="/" className="back-button back-button-top">{"< "}Back</Link>
            <span className="product-page-title">
              {title}
            </span>
          </div>
          <div className="product-page-left">
            <img src={big.src} />
          </div>
          <div className="product-page-right">
            <p className="product-page-description">
              {description}
            </p>
            <div className="product-purchase-url">
              {this.renderPurchaseButton()}
            </div>
            <div className="product-page-category">
              <p>category: {category}</p>
            </div>
            <div className="product-page-tags">
              {
                map(tags, (tag) => {
                  return <span className="product-tag">{tag}</span>
                })
              }
            </div>
            <div>
              <Link to="/" className="back-button back-button-bottom">All Gift Ideas</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail

export const productDetailFragment = graphql`
  fragment ProductDetail_details on ProductsJson {
    amazonUrl
    category
    description
    price
    purchaseUrl
    slug
    tags
    title
    bigImage: image_file {
      childImageSharp {
        big: resize(width: 640, cropFocus: ENTROPY) {
          src
        }
      }
    }
  }
`
