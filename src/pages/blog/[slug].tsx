import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'

import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {

  const blogs = ((context: __WebpackModuleApi.RequireContext) => {
    const keys = context.keys()

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      return slug
    })

    return data
  })(
    require.context('../../data', true, /\.md$/)
  )

  const paths = blogs.map(slug => {
    return `/blog/${slug}`
  })

  // console.log(paths)

  return {
    paths: paths,
    fallback: false,
  };
}

export const getStaticProps : GetStaticProps = async (context: GetStaticPropsContext) => {

  const { slug } = context.params

  const data = await import(`../../data/${slug}.md`)

  const singleDocument = matter(data.default)


  console.log(singleDocument)

  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content
    }
  }
};

const SingleBlogPage = (props: SingleBlog) => {
  return (
    <>
      <h1>{props.frontmatter.title}</h1>
      <p>{props.frontmatter.date}</p>
      <ReactMarkdown children={props.markdownBody} />
    </>
  )
}

export default SingleBlogPage

type SingleBlog = {
  frontmatter: {
    id: string,
    title: string,
    date: string,
    image: string,
    excerpt: string
  },
  markdownBody: string
}
