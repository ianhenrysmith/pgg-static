import * as PropTypes from "prop-types"
import React from "react"
import Link from "gatsby-link"
import { map, isEmpty } from "lodash"

class Product extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      smallImage: PropTypes.object,
      title: PropTypes.string,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { smallImage, slug, title, tags } = this.props.product
    const { small } = smallImage.childImageSharp
    return (
      <div className="product-tile">
        <Link to={`/${slug}/`}>
          <div className="product-image">
            <img src={small.src} />
          </div>
          <div className="product-title">{title}</div>
          <div className="product-tags">
            {
              map(tags, (tag) => {
                return <span className="product-tag">{tag}</span>
              })
            }
          </div>
        </Link>
      </div>
    )
  }
}

export default Product

export const productFragment = graphql`
  fragment Product_details on ProductsJson {
    smallImage: image_file {
      childImageSharp {
        small: resize(width: 480, height: 297, cropFocus: ENTROPY) {
          src
        }
      }
    }
  }
`
