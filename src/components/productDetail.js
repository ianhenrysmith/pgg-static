import React from "react"
import Link from "gatsby-link"

import { map } from "lodash"

class ProductDetail extends React.Component {
  render() {
    const {
      amazonUrl,
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
        <p className="product-page-title">{title}</p>
        <div className="product-page-left">
          <img src={big.src} />
        </div>
        <div className="product-page-right">
          <p className="product-page-description">
            {description}
          </p>
          <div className="product-purchase-url">
            <a href={amazonUrl}>Purchase</a>
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
        </div>
        <div>
          <Link to="/">{"<<<"}Back</Link>
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
    slug
    tags
    title
    bigImage: image_file {
      childImageSharp {
        big: resize(width: 640, height: 396, cropFocus: ENTROPY) {
          src
        }
      }
    }
  }
`
