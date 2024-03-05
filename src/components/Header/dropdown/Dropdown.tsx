'use client'

import Link from 'next/link'
import style from './Dropdown.module.sass'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface ICatalog {
  id: number
  img: string
  name: string
  url: string
}

export default function Dropdown() {
  const [catalog, setCatalog] = useState([])

  const getData = useCallback(async () => {
    const res = await fetch(`https://${process.env.DOMAIN}/catalog`).then(res =>
      res.json()
    )

    return setCatalog(res)
  }, [])
  getData()
  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className={style.dropdown}>
      <ul className={style.list}>
        {catalog &&
          catalog.map(({ id, img, name, url }: ICatalog) => (
            <Link key={id} className={style.item} href={`/${url}`}>
              <li>{name}</li>
            </Link>
          ))}
      </ul>
    </div>
  )
}
