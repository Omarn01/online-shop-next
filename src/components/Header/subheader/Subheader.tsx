import Link from 'next/link'
import style from './Subheader.module.sass'

function Subheader() {
  return (
    <div className={style.subheader}>
      <div className={style.logo}>
        <Link href={'/'}>Online Shop</Link>
      </div>
      <div className={style.info}>
        <div className={style.login}>Login</div>
        <div className={style.contacts}>
          <ul className={style.list}>
            <Link href={'/'}>
              <li>tg</li>
            </Link>
            <Link href={'/'}>
              <li>vk</li>
            </Link>
            <Link href={'/'}>
              <li>whatsapp</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Subheader
