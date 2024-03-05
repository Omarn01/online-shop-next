'use client'

import { useEffect, useState } from 'react'
import style from './Catalog.module.sass'
import CategoryItem from '../categoryItem/CategoryItem'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import { usePathname } from 'next/navigation'

interface ICategory {
  id: number
  img: string
  url: string
  name: string
}

function Catalog() {
  let pathname = usePathname()
  const category = pathname.split('/').at(-1)
  const [data, setData] = useState<Array<ICategory>>([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [breadcrumbs, setBreadcrumbs] = useState<Array<string>>([])

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/${category}`).then(res =>
        res.json()
      )

      setData(data.data)
      setTitle(data.title)
      setSubtitle(data.subtitle)
      setBreadcrumbs(data.breadcrumbs)
    }

    getData()
  }, [])

  return (
    <div className={`${style.category} container`}>
      <div className={style.breadcrumbs}>
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
          breadcrumbs.map(({ id, title: name, url }: any) => (
            <Link
              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              key={id}
              href={url}
              className={`${name === title ? 'gray' : ''}`}
            >
              {name}
              {name !== title && <IoIosArrowForward />}
            </Link>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <h1 className={style.title}>{title}</h1>
      <div className={style.catalogItem}>
        {!!data.length ? (
          data.map(({ id, img, url, name }: ICategory) => (
            <CategoryItem key={id} img={img} url={url} title={name} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

export default Catalog
