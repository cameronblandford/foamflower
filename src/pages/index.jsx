import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const welcomes = [
  "welcome home",
  "welcome",
  "do you belong here?",
  "try to be merciful",
  "a shattered glass",
];

const pick = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const welcome = pick(welcomes);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>{welcome}</h1>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
