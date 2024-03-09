import style from './Characteristics.module.sass'

interface ICharacteristics {
  title: string
  value: string
}

function Characteristics({ title, value }: ICharacteristics) {
  return (
    <div className={style.characteristics_spec}>
      <p className={style.characteristics_spec_title}>{title}</p>
      <p className={style.characteristics_spec_value}>{value}</p>
    </div>
  )
}

export default Characteristics
