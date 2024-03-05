import style from './Header.module.sass'
import Subheader from './subheader/Subheader'
import Main from './main/Main'

async function Header() {
  return (
    <header className={style.header}>
      <div className={`${style.container} container`}>
        <Subheader />
        <Main />
      </div>
    </header>
  )
}

export default Header
