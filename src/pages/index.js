import React from "react";
import Link from "gatsby-link";
import _ from "lodash";

import productsData from "../data/products.json"

const logThing = () => { console.log("try the logging") }

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    {
      _.map(productsData.products, (product) => {
        return (
          <div className="product-link">
            <Link to={`/${product.slug}`}>{product.title}</Link>
          </div>
        )
      })
    }
  </div>
)

export default IndexPage
