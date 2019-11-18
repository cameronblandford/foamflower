import React from "react"
import Layout from '../components/layout'
import { Link } from 'gatsby'
const PostLink = (props) => {
  const { post } = props;
  return <div><Link to={post.frontmatter.path}><h3>{post.frontmatter.title}</h3></Link><p>{post.excerpt}</p></div>
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)
  return <Layout>{Posts}</Layout>
}
export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`