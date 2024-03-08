'use client'

import { useState } from 'react'
import style from './Card.module.sass'

import { IoCartOutline } from 'react-icons/io5'
import { IoIosHeartEmpty } from 'react-icons/io'
import { PiArrowCircleLeft } from 'react-icons/pi'
import { PiArrowCircleRight } from "react-icons/pi";

import Link from 'next/link'

interface ICard {
  id: number
  title: string
  url: string
  img: Array<string>
  rating?: number
  count?: number
  price: number
}

function Slider({ id, title, url, img, rating, count, price }: ICard) {
  const [width, setWidth] = useState(0)

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.slider}>
          <div className={style.prev}>
            <PiArrowCircleLeft />
          </div>
          {/* <div > */}
          <Link className={style.slider_wrapper} href={url}>
            {img.map((url, i) => (
              <div className={style.slide} key={i}>
                <img src={url} />
              </div>
            ))}
          </Link>
          {/* </div> */}
          <div className={style.next}>
            <PiArrowCircleRight />
          </div>
        </div>
        <div className={style.content}>
          <div className={style.title}>
            <Link href={url}>{title}</Link>
          </div>
          <div className={style.stat}>
            <div className={style.compare}>
              <p>Сравнить</p>
              <input type='checkbox' />
            </div>
            <p>Рейтинг: {rating}</p>
          </div>
          <div className={style.count}>В наличии: {count}</div>
          <div className={style.price}>Цена: {price} руб.</div>
          <div className={style.buttons}>
            <div className={style.favorite}>
              <IoIosHeartEmpty />
            </div>
            <div className={style.buy}>
              <IoCartOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
