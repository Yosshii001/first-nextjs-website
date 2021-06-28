import Link from 'next/link'
import React from 'react'

import * as style from '../styles/index.module.css'

const index = () => {
  return (<>
      <h1 className={style.h1Style}>
        こんちには
      </h1>
      <Link href="/contact"><a>Contactページへ移動</a></Link>
      <Link href="/blog"><a>Blogページへ移動</a></Link>
    </>
  )
}

export default index
