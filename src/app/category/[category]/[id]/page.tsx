'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import style from './page.module.sass'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

interface IProps {
  id?: number
  img?: string
  title?: string
  url?: string
  price?: number
}

export default function Page() {
  let pathname = usePathname()
  const category = pathname.split('/').at(-1)

  const [data, setData] = useState<IProps>({})
  const [breadcrumbs, setBreadcrumbs] = useState<Array<string>>([])

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(
        `https://online-shop-next-server-pcmt847ny-omarn01s-projects.vercel.app/electricHobs`
      ).then(res => res.json())

      setData(data.data.find(({ id }: any) => id == category))
      setBreadcrumbs(
        data.data.find(({ id }: any) => id == category).breadcrumbs
      )
      //   data.data.map(({ id }: any) => console.log(id))
    }

    getData()
  }, [])
  console.log(data)
  return (
    <div className={`${style.product} container`}>
      <p className={style.toHome}>
        {category === 'catalog' ? (
          <Link href={'/'}>
            DNS <IoIosArrowForward />
          </Link>
        ) : (
          <Link href={'/catalog'}>
            Каталог <IoIosArrowForward />
          </Link>
        )}
      </p>
      {breadcrumbs ? (
        breadcrumbs.map(({ id, title, url }: any) => (
          <Link
            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
            key={id}
            href={url}
            className={`${title === data.title ? 'gray' : ''}`}
          >
            {title}
            {title !== data.title && <IoIosArrowForward />}
          </Link>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
      {data.id ? data.title : <h1>Loading...</h1>}
    </div>
  )
}
