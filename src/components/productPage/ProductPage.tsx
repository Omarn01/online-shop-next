'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import {
  IoIosArrowForward,
  IoIosInformationCircleOutline,
  IoMdHeartEmpty,
} from 'react-icons/io'
import { IoShareSocialOutline } from 'react-icons/io5'
import Card from '@/components/slider/Card'

import style from './ProductPage.module.sass'
import Main from './main/Main'

interface IProps {
  id?: number
  img?: string
  title?: string
  url?: string
  price?: number
}

function ProductPage() {
  let pathname = usePathname()
  const id = pathname.split('/').at(-1)

  const [data, setData] = useState<any>({})
  const [breadcrumbs, setBreadcrumbs] = useState<Array<string>>([])

  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/electricHobs/${id}`).then(
        res => res.json()
      )
      setData(data)

      // setBreadcrumbs(
      //   data.data.find(({ id }: any) => id == category).breadcrumbs
      // )
    }

    getData()
  }, [])
  //   console.log(data)
  //   data.map(({ breadcrumbs }: any) =>
  //     console.log(breadcrumbs.title === data.title)
  //   )

  return (
    <>
      {!!data.length ? (
        data.map(
          ({
            breadcrumbs,
            title,
            subtitle,
            count,
            price,
            preview,
            bigImg,
            moreData: { sellerWarranty },
          }: any) => (
            <div className={`${style.product} container`}>
              {breadcrumbs ? (
                breadcrumbs.map(({ id, _title, url }: any) => {
                  _title !== data.title && (
                    //     <Link
                    //       style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                    //       key={id}
                    //       href={url}
                    //       className={`${_title === data.title ? 'gray' : ''}`}
                    //     >
                    //       {_title}
                    //       {_title !== data.title && <IoIosArrowForward />}
                    //     </Link>
                    //   ) : (
                    <p className='gray'>{_title}</p>
                  )
                })
              ) : (
                <h1>Loading...</h1>
              )}
              <Main
                title={title}
                subtitle={subtitle}
                count={count}
                price={price}
                preview={preview}
                bigImg={bigImg}
                slide={slide}
                setSlide={setSlide}
              />
              <div className={style.content}>
                <div className={style.tabs}></div>
                <div className={style.characteristics}>
                  <h2>Характеристики {title}</h2>
                  <div>
                    <p>Заводские данные</p>
                    <p>Гарантия продавца {sellerWarranty}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  )
}

export default ProductPage

//
