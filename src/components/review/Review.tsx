import style from './Review.module.sass'

import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

export interface IReview {
  id?: number
  title: string
  name: string
  real: boolean
  date: string
  rating: number
  termUse: string
  dignity: string
  flaws: string
  comment: string
}

function Review({
  title,
  name,
  real,
  date,
  rating,
  termUse,
  dignity,
  flaws,
  comment,
}: IReview) {
  return (
    <div className={style.review}>
      <div className={style.header}>
        <div className={style.header_top}>
          <div className={style.header_top_title}>
            <div className={style.profile}>
              <div className={style.profile_avatar}></div>
              <div className={style.profile_name}>{name}</div>
              {real && (
                <div className={style.profile_real}>
                  <IoMdCheckmarkCircleOutline /> Реальный покупатель
                </div>
              )}
            </div>
            <div className={style.date}>
              <p>{date}</p>
              <p>DNS shop.ru</p>
            </div>
          </div>
          <div className={style.header_top_rating}>
            <p>Оценка: </p>
            <p>{rating}</p>
          </div>
        </div>
        <div className={style.header_bottom}>
          <div className={style.product}>
            Товар: <span>{title}</span>
          </div>
          <div className={style.termUse}>
            Срок использования: <span>{termUse}</span>
          </div>
        </div>
      </div>
      <div className={style.dignity}>
        <h3>Достоинства</h3>
        <p>{dignity}</p>
      </div>
      <div className={style.flaws}>
        <h3>Недостатки</h3>
        <p>{flaws}</p>
      </div>
      <div className={style.dignity}>
        <h3>Комментарий</h3>
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default Review
