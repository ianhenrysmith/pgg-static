import React from "react"

class ProductDetail extends React.Component {
  render() {
    const {
      title,
      slug,
      image_url
    } = this.props.product

    return (
      <div>{title}</div>
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
