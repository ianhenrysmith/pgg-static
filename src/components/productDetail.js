import React from "react"
import Link from "gatsby-link"

class ProductDetail extends React.Component {
  render() {
    const {
      title,
      slug,
      image_url
    } = this.props.product

    return (
      <div>
        <p>{title}</p>
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
  }
`
