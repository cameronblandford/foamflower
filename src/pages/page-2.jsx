import React from "react"
import { Link } from "gatsby"
import Kabbalah from '../components/kabbalh'

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <p>Information can go here</p>
    <Kabbalah word={'hello'}/>
  </Layout>
)

export default SecondPage
