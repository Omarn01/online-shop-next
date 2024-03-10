'use client'

import { useEffect, useState } from 'react'
import style from './Communicator.module.sass'
import Discussion from './discussion/Discussion'
import { usePathname } from 'next/navigation'

interface ICommunicator {
  product: string
}

export interface IDiscussion {
  id?: number
  title: string
  name: string
  date: string
  text: string
  views: number
  comments: number
}

function Communicator({ product }: ICommunicator) {
  const [data, setData] = useState<Array<IDiscussion>>([])
  let pathname = usePathname()
  const id = pathname.split('/').at(-1)

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://localhost:3001/discussion/${id}`).then(
        data => data.json()
      )
      setData(data)
    }

    getData()
  }, [])
  console.log(data, 'dis')

  return (
    <div className={style.communicator}>
      <div className={style.communicator_header}>
        <h2 className={style.communicator_title}>
          Коммуникатор - обсуждение {product}
        </h2>
        <p className={style.communicator_subtitle}>
          Коммуникатор — среда для общения, обмена опытом и знаниями касательно
          товаров между пользователями сайта. Здесь можно обсудить продукцию,
          задать по ней вопрос, решить проблему с выбором и использованием, а
          также помочь другим участникам.
        </p>
      </div>
      <div className={style.createDiscussion}>
        <input type='text' placeholder='Заголовок' />
        <textarea placeholder='Подробно опишите Вашу проблему' />
        <button>Опубликовать</button>
      </div>
      <main className={style.main}>
        <div className={style.themes}>
          <div className={style.theme}>Новые темы</div>
          <div className={style.theme}>Популярное</div>
          <div className={style.theme}>Лучшее</div>
          <div className={style.theme}>Обсуждаемое</div>
        </div>
        <div className={style.discussion}>
          {!!data.length &&
            data.map(({ id, title, name, date, text, views, comments }) => (
              <Discussion
                key={id}
                title={title}
                name={name}
                date={date}
                text={text}
                views={views}
                comments={comments}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Communicator
