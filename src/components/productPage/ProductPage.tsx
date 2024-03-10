'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Link from 'next/link'
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosInformationCircleOutline,
  IoMdHeartEmpty,
} from 'react-icons/io'
import { MdOutlineInsertChartOutlined } from 'react-icons/md'
import { IoShareSocialOutline } from 'react-icons/io5'
import Card from '@/components/slider/Card'

import style from './ProductPage.module.sass'
import Main from './main/Main'
import Characteristics from './characteristics/Characteristics'
import Reviews, { IReview } from '../review/Review'
import MistakeFeedback from './mistakeFeedback/MistakeFeedback'
import Communicator from './communicator/Communicator'

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
  const [reviews, setReviews] = useState<Array<IReview>>([])
  const [slide, setSlide] = useState(0)
  const [tabs, setTabs] = useState('characteristics')
  const [allChar, setAllChar] = useState(false)

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
      setReviews(data)
    }

    getData()
  }, [])
  console.log(reviews)

  const viewAllChar = useCallback(() => {
    setAllChar(prev => !prev)
  }, [allChar])

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
            instructionsAndFiles,
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
                      className={`${style.tab} ${
                        tabs === 'characteristics' && style.tab_active
                      }`}
                      onClick={() => setTabs('characteristics')}
                    >
                      Характеристики
                    </div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'reviews' && style.tab_active
                      }`}
                      onClick={() => setTabs('reviews')}
                    >
                      Отзывы {reviews.length}
                    </div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'communicator' && style.tab_active
                      }`}
                      onClick={() => setTabs('communicator')}
                    >
                      Коммуникатор
                    </div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'reliabilityAssessment' && style.tab_active
                      }`}
                      onClick={() => setTabs('reliabilityAssessment')}
                    >
                      Оценка надежности
                    </div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'survey' && style.tab_active
                      }`}
                      onClick={() => setTabs('survey')}
                    >
                      Обзоры
                    </div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'instructionsAndFiles' && style.tab_active
                      }`}
                      onClick={() => setTabs('instructionsAndFiles')}
                    >
                      Инструкции и файлы
                    </div>
                    <div className={style.delimiter}></div>
                    <div
                      className={`${style.tab} ${
                        tabs === 'instructionsAndFiles' && style.tab_active
                      }`}
                      onClick={() => setTabs('instructionsAndFiles')}
                    >
                      Аналогичные товары
                    </div>

                    <div
                      className={`${style.tab} ${
                        tabs === 'instructionsAndFiles' && style.tab_active
                      }`}
                      onClick={() => setTabs('instructionsAndFiles')}
                    >
                      Аксессуары
                    </div>
                  </div>
                </div>
                <div className={style.right}>
                  {tabs === 'characteristics' && (
                    <>
                      <div className={style.characteristics}>
                        <div
                          style={{ maxHeight: `${allChar ? '100%' : '200px'}` }}
                          className={style.characteristics_content}
                        >
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

                        <div className={style.characteristics_footer}>
                          <div
                            onClick={viewAllChar}
                            className={style.characteristics_all}
                          >
                            {allChar ? (
                              <div className={style.characteristics_all_button}>
                                Скрыть <IoIosArrowUp />
                              </div>
                            ) : (
                              <div className={style.characteristics_all_button}>
                                Показать все <IoIosArrowDown />
                              </div>
                            )}
                          </div>
                          <Link
                            href={
                              'https://www.dns-shop.ru/guide/17a8a01d-1640-11e5-a679-00259074e77d/'
                            }
                            className={style.characteristics_howToChoose}
                          >
                            <IoIosInformationCircleOutline />
                            Как выбрать?
                          </Link>
                        </div>
                      </div>

                      <div className={style.description}>
                        <h3 className={style.description_title}>Описание</h3>
                        <p>{description}</p>
                      </div>

                      <div className={style.review}>
                        {!!reviews.length &&
                          reviews.map((review: IReview) => (
                            <Reviews
                              key={review.id}
                              count={reviews.length}
                              title={review.title}
                              name={review.name}
                              real={review.real}
                              date={review.date}
                              rating={review.rating}
                              termUse={review.termUse}
                              dignity={review.dignity}
                              flaws={review.flaws}
                              comment={review.comment}
                              likes={review.likes}
                              tabs={tabs}
                              setTabs={setTabs}
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
                      <MistakeFeedback />
                    </>
                  )}
                  {tabs === 'reviews' && (
                    <>
                      <div className={style.review}>
                        {!!reviews.length &&
                          reviews.map((review: IReview) => (
                            <Reviews
                              key={review.id}
                              count={reviews.length}
                              title={review.title}
                              name={review.name}
                              real={review.real}
                              date={review.date}
                              rating={review.rating}
                              termUse={review.termUse}
                              dignity={review.dignity}
                              flaws={review.flaws}
                              comment={review.comment}
                              likes={review.likes}
                              tabs={tabs}
                              setTabs={setTabs}
                            />
                          ))}
                      </div>
                      <MistakeFeedback />
                    </>
                  )}
                  {tabs === 'instructionsAndFiles' && (
                    <>
                      <div className={style.instructionsAndFiles}>
                        <h3>Инструкции и файлы для {title}</h3>
                        {!!instructionsAndFiles.length &&
                          instructionsAndFiles.map(
                            ({ id, title, url }: any) => (
                              <Link key={id} href={url}>
                                {title}
                              </Link>
                            )
                          )}
                      </div>
                      <MistakeFeedback />
                    </>
                  )}
                  {tabs === 'communicator' && <Communicator product={title} />}
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
