import { IoIosInformationCircleOutline, IoMdHeartEmpty } from 'react-icons/io'
import style from './Buy.module.sass'

interface IProps {
  count: number
  price: number
}

export default function Buy({ count, price }: IProps) {
  return (
    <div className={style.buy}>
      <div className={style.buy_top}>
        <div className={style.buy_price_info}>
          <div className={style.buy_price}>
            <p className={style.price}>{price} ₽</p>
            <p className={style.subprice}>
              от {Math.round((price / 12) * 1.17)} ₽/мес.
            </p>
          </div>
          <div className={style.info}>
            <IoIosInformationCircleOutline />
          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.favorite}>
            <IoMdHeartEmpty />
          </div>
          <button className={style.buy_button}>Купить</button>
        </div>
      </div>

      <div className={style.buy_bottom}>
        <div className={style.stock}>
          <div className={style.stock_item}>
            <p>В наличии: </p>
            <p>{count} шт.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
