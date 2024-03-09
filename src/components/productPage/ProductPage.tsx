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
import Characteristics from './characteristics/Characteristics'
import Review, { IReview } from '../review/Review'

interface IProps {
  id?: number
  img?: string
  title?: string
  url?: string
  price?: number
}

interface IBreadcrumbs {
  id: number
  title: string
  url: string
}

function ProductPage() {
  let pathname = usePathname()
  const id = pathname.split('/').at(-1)

  const [data, setData] = useState<any>({})
  const [review, setReview] = useState<Array<IReview>>([])
  const [slide, setSlide] = useState(0)
  const [tabs, setTabs] = useState('characteristics')

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/electricHobs/${id}`).then(
        res => res.json()
      )
      setData(data)
    }

    getData()
  }, [])
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/reviews/${id}`).then(
        res => res.json()
      )
      setReview(data)
    }

    getData()
  }, [])
  console.log(review)

  return (
    <>
      {!!data.length ? (
        data.map(
          ({
            id,
            breadcrumbs,
            title,
            subtitle,
            companyImg,
            count,
            price,
            preview,
            bigImg,
            moreData: { sellerWarranty, manufacturerCountry, type, model },
            description,
            descriptionReviewImg,
            descriptionReviewUrl,
            descriptionReviewTitle,
          }: any) => (
            <div key={id} className={`${style.product} container`}>
              <div className={style.breadcrumbs}>
                {!!breadcrumbs.length ? (
                  breadcrumbs.map((i: IBreadcrumbs) =>
                    i.title !== title ? (
                      <Link
                        key={i.id}
                        href={i.url}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        {i.title} <IoIosArrowForward />
                      </Link>
                    ) : (
                      <p className='gray' key={i.title}>
                        {title}
                      </p>
                    )
                  )
                ) : (
                  <h1>Loading</h1>
                )}
              </div>
              <Main
                title={title}
                subtitle={subtitle}
                count={count}
                price={price}
                companyImg={companyImg}
                preview={preview}
                bigImg={bigImg}
                slide={slide}
                setSlide={setSlide}
              />
              <div className={style.content}>
                <div className={style.left}>
                  <div className={style.tabs}>
                    <div
                      className={style.tab}
                      onClick={() => setTabs('characteristics')}
                    >
                      Характеристики
                    </div>
                    <div
                      className={style.tab}
                      onClick={() => setTabs('reviews')}
                    >
                      Отзывы
                    </div>
                  </div>
                </div>
                <div className={style.right}>
                  {tabs === 'characteristics' && (
                    <>
                      <div className={style.characteristics}>
                        <h2 className={style.characteristics_title}>
                          Характеристики {title}
                        </h2>

                        <div className={style.characteristics_group}>
                          <h3 className={style.characteristics_group_title}>
                            Заводские данные
                          </h3>
                          <Characteristics
                            title='Гарантия продавца'
                            value={sellerWarranty}
                          />
                          <Characteristics
                            title='Страна-производитель'
                            value={manufacturerCountry}
                          />
                        </div>

                        <div className={style.characteristics_group}>
                          <h3 className={style.characteristics_group_title}>
                            Общие характеристики
                          </h3>
                          <Characteristics title='Тип' value={type} />
                          <Characteristics title='Модель' value={model} />
                        </div>
                      </div>
                      <div className={style.description}>
                        <h3 className={style.description_title}>Описание</h3>
                        <p>{description}</p>
                      </div>
                      <div className={style.review}>
                        {!!review.length &&
                          review.map((review: IReview) => (
                            <Review
                              key={review.id}
                              title={review.title}
                              name={review.name}
                              real={review.real}
                              date={review.date}
                              rating={review.rating}
                              termUse={review.termUse}
                              dignity={review.dignity}
                              flaws={review.flaws}
                              comment={review.comment}
                            />
                          ))}
                      </div>
                      <div className={style.description_review}>
                        <Link
                          style={{
                            backgroundImage: `url(${descriptionReviewImg})`,
                          }}
                          href={descriptionReviewUrl}
                        >
                          {descriptionReviewTitle}
                        </Link>
                      </div>
                    </>
                  )}
                  {tabs === 'reviews' && (
                    <div className={style.review}>
                      {!!review.length &&
                        review.map((review: IReview) => (
                          <Review
                            key={review.id}
                            title={review.title}
                            name={review.name}
                            real={review.real}
                            date={review.date}
                            rating={review.rating}
                            termUse={review.termUse}
                            dignity={review.dignity}
                            flaws={review.flaws}
                            comment={review.comment}
                          />
                        ))}
                    </div>
                  )}
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
