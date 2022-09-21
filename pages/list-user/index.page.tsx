import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
// import classes from './styles.module.scss'
// import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { Table, Space, Tooltip, Button, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'

// layout
import type { ReactElement } from 'react'
import NestedLayout from 'src/layout/nestedLayout'
import type { NextPageWithLayout } from 'pages/_app.page'
import { useTheme } from 'next-themes'

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e)
  message.success('Click on Yes')
}

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e)
  message.error('Click on No')
}

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    render: () => (
      <Space size="middle">
        <Tooltip placement="bottom" title="Update">
          <Button>
            <EditOutlined />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Delete">
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Tooltip>
      </Space>
    ),
  },
]

const ListUser: NextPageWithLayout = () => {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <>
      The current theme is: {theme}
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

ListUser.getLayout = function getLayout(page: ReactElement) {
  return <NestedLayout>{page}</NestedLayout>
}

export default ListUser
