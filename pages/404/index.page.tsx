import React from 'react'
import Link from 'next/link'
// layout
import type { NextPageWithLayout } from 'pages/_app.page'

import { Button, Result } from 'antd'

const Custom404: NextPageWithLayout = () => {
  return (
    <div className="container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link href="/">
              <a>Back Home</a>
            </Link>
          </Button>
        }
      />
    </div>
  )
}

export default Custom404
