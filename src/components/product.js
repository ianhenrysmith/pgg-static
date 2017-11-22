import * as PropTypes from "prop-types"
import React from "react"
import Link from "gatsby-link"

class Product extends React.Component {
  static propTypes = {
    product: PropTypes.shape({
      smallImage: PropTypes.object,
      title: PropTypes.string,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { smallImage, slug, title } = this.props.product
    const { small } = smallImage.childImageSharp
    return (
      <Link to={`/${slug}/`}>
        <div>
          <img
            src={small.src}
            srcSet={small.srcSet}
            sizes="(min-width: 960px) 292px, 33vw"/>
        </div>
        <div>{title}</div>
      </Link>
    )
  }
}

export default Product

export const productFragment = graphql`
  fragment Product_details on ProductsJson {
    slug
    title
    smallImage: image_file {
      childImageSharp {
        small: responsiveSizes(maxWidth: 292, maxHeight: 292) {
          src
          srcSet
        }
      }
    }
  }
`
