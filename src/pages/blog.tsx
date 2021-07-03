import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Layout from "../components/Layout"

import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
import matter from 'gray-matter';

import * as style from "../styles/blog.module.scss" ;

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
      const value: any = values[index]
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
  <Layout>
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Blog</h1>
        <p>エンジニアの日常生活をお届けします</p>
        {props.blogs.map((blog, index) => {
            return(
                <div key={index} className={style.blogCard}>                            
                    <div className={style.textContainer}>
                        <h3>{blog.frontmatter.title}</h3>
                        <p>{blog.frontmatter.excerpt}</p>
                        <p>{blog.frontmatter.date}</p>
                        <Link href={`/blog/${blog.slug}`}><a>Read More</a></Link>
                    </div>
                    <div className={style.cardImg}>
                        <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} />
                    </div>  
                </div>
            )}
        )}
        </div>
    </div>
  </Layout>
  )
}

export default Blog