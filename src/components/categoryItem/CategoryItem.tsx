import Image from 'next/image'
import style from './CategoryItem.module.sass'
import Link from 'next/link'

interface IProps {
  img: string
  title: string
  url: string
}

function CategoryItem({ img, title, url }: IProps) {
  return (
    <Link href={url} className={style.categoryItem}>
      <img className={style.image} src={img} alt={title} />
      <h3 className={style.title}>{title}</h3>
    </Link>
  )
}

export default CategoryItem
