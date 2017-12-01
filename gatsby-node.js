const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allProductsJson(limit: 1000) {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(new Error(result.errors))
        }

        const productTemplate = path.resolve(`src/templates/productPage.js`)
        _.each(result.data.allProductsJson.edges, edge => {
          createPage({
            path: `/${slug(edge.node.slug)}/`,
            component: slash(productTemplate),
            context: {
              slug: edge.node.slug,
            },
          })
        })
        return
      })
    )
  })
}