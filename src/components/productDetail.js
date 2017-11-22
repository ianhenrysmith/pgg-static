import React from "react"
import Link from "gatsby-link"

class ProductDetail extends React.Component {
  render() {
    const {
      title,
      slug,
      image_url,
      image_file,
      bigImage
    } = this.props.product

    const { big } = bigImage.childImageSharp

    return (
      <div>
        <p>{title}</p>
        <div>
          <img key={big.src}
               src={big.src}
               srcSet={big.srcSet}
               sizes="(min-width: 640px) 640px, 100vw" />
        </div>
        <Link to="/">{"<<<"}Back</Link>
      </div>
    )
  }
}

export default ProductDetail

export const productDetailFragment = graphql`
  fragment ProductDetail_details on ProductsJson {
    title
    slug
    image_url
    bigImage: image_file {
      childImageSharp {
        big: sizes(maxWidth: 640) {
          src
          srcSet
        }
      }
    }
  }
`
