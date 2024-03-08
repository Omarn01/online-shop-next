import { IoShareSocialOutline } from 'react-icons/io5'
import Buy from '../buy/Buy'
import style from './Main.module.sass'

interface IMain {
  title: string
  preview: Array<string>
  bigImg: Array<string>
  subtitle: string
  count: number
  price: number
  slide: number
  setSlide: Function
}

function Main({
  title,
  preview,
  bigImg,
  subtitle,
  count,
  price,
  slide,
  setSlide,
}: IMain) {
  return (
    <main key={1} className={style.main}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.mainInfo}>
        <div className={style.img}>
          <div className={style.preview}>
            {preview.map((img: string, i: number) => (
              <img onClick={() => setSlide(i)} src={img} />
            ))}
          </div>
          <div className={style.image}>
            <img src={bigImg[slide]} alt='' />
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infoTop}>
            <h2>{subtitle}</h2>
            <img
              src='https://c.dns-shop.ru/thumb/st4/fit_width/110/110/bd6b1443789bc340cb938f3864afc465/97252067c06a393acd28c636b743004fab8398416a01214731e8a7f62307b4ea.png'
              alt=''
            />
          </div>
          <div className={style.info_stat}>
            <div>
              <div className={style.info_comparison}>
                Сравнить <input type='checkbox' />
              </div>
            </div>
            <div className={style.share}>
              <IoShareSocialOutline />
            </div>
          </div>
          <Buy count={count} price={price} />
        </div>
      </div>
    </main>
  )
}

export default Main
