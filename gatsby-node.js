const _ = require("lodash")
const path = require("path")
const slug = require("slug")
const slash = require("slash")
const productsData = require("./src/data/products.json")

exports.createPages = ({ boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const productTemplate = path.resolve("src/templates/productPage.js");

  _.each(productsData.products, product => {
    createPage({
      path: `/${slug(product.slug)}/`,
      component: slash(productTemplate),
      context: { product }
    })
  })
}
