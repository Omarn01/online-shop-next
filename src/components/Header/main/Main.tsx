'use client'

import Link from 'next/link'
import style from './Main.module.sass'
import Dropdown from '../dropdown/Dropdown'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

function Main() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={style.main}>
      <nav className={style.nav}>
        <ul className={style.list}>
          <Link href={'/'}>
            <li>Избранное</li>
          </Link>
          <Link href={'/'}>
            <li>Корзина</li>
          </Link>
          <li className={style.dropWrapper}>
            <Link href='/catalog'>Link</Link>
            <button onClick={() => setIsOpen(prev => !prev)}>
              <IoIosArrowDown />
            </button>
            {isOpen && <Dropdown />}
          </li>
        </ul>
      </nav>
      <div className={style.search}>
        <input placeholder='Search' className={style.input} type='text' />
        <button className={style.button}>Search</button>
      </div>
    </div>
  )
}

export default Main
