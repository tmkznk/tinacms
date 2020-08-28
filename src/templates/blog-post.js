import React from "react"

import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'
import { graphql } from 'gatsby'

export default function BlogPostTemplate(props) {

  const FormOptions = {
    label: 'Blog Post',
    fields: [
      {
        label: 'Title',
        name: 'frontmatter.title',
        description: 'Enter the title of the post here',
        component: 'text',
      },
      {
        label: 'Description',
        name: 'frontmatter.description',
        description: 'Enter the post description',
        component: 'textarea',
      },
    ],
  }

  const [markdownRemark, form] = useRemarkForm(props.data.markdownRemark, FormOptions)
  usePlugin(form)

  return (
    <>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.description}</p>
    </>
  )
}

export const blogPostQuery = graphql`
  query BlogPostBlogPostQuery ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      ...TinaRemark
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`