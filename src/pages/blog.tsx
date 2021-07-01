import React from 'react'

import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import matter from 'gray-matter';
import Link from 'next/link';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

type BlogProps = { 
  blogs: [ BlogPage ]
}

type BlogPage = {
  frontmatter: {
    id: string,
    title: string,
    date: string,
    image: string,
    excerpt: string
  },
  slug: string
}

export const getStaticProps : GetStaticProps = async (context: GetStaticPropsContext) => {

  const blogs = ((context: __WebpackModuleApi.RequireContext) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)

      return {
        frontmatter: document.data,
        slug: slug
      }
    })

    return data
  })(
    require.context('../data', true, /\.md$/)
  )

  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id
  })

  return {
    props: {
      blogs: orderedBlogs
    },
  };
};

const Blog:　NextPage<Props> = (props: BlogProps) => {

  return (
    <div>
      <h1>ブログページ</h1>
      { props.blogs.map((blog, index) => (<>
        <div key={index}>
          <h3>{blog.frontmatter.title}</h3>
          <p>{blog.frontmatter.date}</p>
          <Link href={`/blog/${blog.slug}`}>Read More</Link>
        </div>
        </>
      ))
      }
    </div>
  )
}

export default Blog