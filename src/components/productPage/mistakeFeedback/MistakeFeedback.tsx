import Link from 'next/link'
import style from './MistakeFeedback.module.sass'

function MistakeFeedback() {
  return (
    <div className={style.mistakeFeedback}>
      <span className='bold'>Нашли ошибку?</span> Выделите текст с ошибкой и
      нажмите Ctrl+Enter или{' '}
      <Link
        href={
          'https://www.dns-shop.ru/feedback/?charter=9dc05fbc-8535-4378-a1f1-0c9f5fe8b6ff&themeGuid=a1edc31e-a2e4-46fc-aebd-b6b2ebb4a952'
        }
      >
        напишите нам.
      </Link>
    </div>
  )
}

export default MistakeFeedback
