import React, { useState } from "react";
import { Link } from "gatsby";
import Kabbalah from "../components/kabbalah";

import Layout from "../components/layout";
import SEO from "../components/seo";

const SecondPage = () => {
  const [gemText, setGemText] = useState("");
  return (
    <Layout>
      <SEO title="Page two" />
      <p>Information can go here</p>
      <input
        placeholder="Input text here"
        value={gemText}
        onChange={e => setGemText(e.target.value)}
      />
      <Kabbalah word={gemText} />
    </Layout>
  );
};

export default SecondPage;
