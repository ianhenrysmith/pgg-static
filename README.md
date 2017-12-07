# pgg-static
just a gift list site built with gatsby


### Development

1. install [npm + node](https://nodejs.org/dist/v9.0.0/)
1. install [homebrew](https://brew.sh/)
1. install yarn `brew install yarn`
1. install gatsby `npm install --global gatsby-cli`
1. clone the app: `git clone https://github.com/gatsbyjs/gatsby.git`
1. run the app: `gatsby develop`
1. visit [http://localhost:8000](http://localhost:8000)

### Adding a product
All product data lives at `data/products.json`
The format for a product's data is:
```
{
  "title": "Product name (not too long plz)",
  "slug": "some-valid-url-format",
  "image_url": "full url of the image in case we need to fetch it",
  "image_file": "images/image-filename.png",
  "description": "One to three sentence description of the product",
  "amazonUrl": "url of where the product is available on Amazon",
  "purchaseUrl": "url of the product if it's not on Amazon",
  "category": "single higher-level category for the item",
  "tags": ["more specific categories"],
  "price": 20
}
```