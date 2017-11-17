import React from "react";
import Link from "gatsby-link";

const logThing = () => { console.log("try the logging") }

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <button onClick={logThing}>log thing?</button>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
