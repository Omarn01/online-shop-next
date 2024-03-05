import Link from 'next/link'
import style from './Card.module.sass'

interface ICard {
  img: string
  url: string
  title: string
  price: number
}

function Card({ img, url, title, price }: ICard) {
  return (
    <Link href={url} className={style.card}>
      <div className={style.image}>
        <img src={img} alt='' />
      </div>
      <div className={style.content}>
        <h2>{title}</h2>
        <p>{price}</p>
      </div>
    </Link>
  )
}

export default Card
