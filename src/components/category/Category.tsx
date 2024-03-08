'use client'

import { useEffect, useState } from 'react'
import style from './Category.module.sass'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'
import CategoryItem from '../categoryItem/CategoryItem'
import Card from '../slider/Card'

interface ICategory {
  id: number
  img: Array<string>
  url: string
  title: string
  price: number
}

function Category() {
  let pathname = usePathname()
  const category = pathname.split('/').at(-1)

  const [data, setData] = useState<Array<ICategory>>([])
  const [breadcrumbs, setBreadcrumbs] = useState<Array<string>>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/${category}`).then(res =>
        res.json()
      )

      setData(data.data)
      setBreadcrumbs(data.breadcrumbs)
      setTitle(data.title)
    }

    getData()
  }, [])

  const toString = (num: number) => {
    return String(num).split('').pop()
  }

  console.log(data)

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
      <h1 className={style.title}>
        {title} {data.length} {data.length} товаров
      </h1>
      <div className={style.catalogItem}>
        {!!data.length ? (
          data.map(({ id, img, url, title, price }: ICategory) => (
            <Card
              key={id}
              id={id}
              img={img}
              url={url}
              title={title}
              price={price}
            />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  )
}

export default Category
