import style from './Discusion.module.sass'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import {
  MdOutlineRemoveRedEye,
  MdOutlineModeComment,
  MdOutlineBookmarkBorder,
} from 'react-icons/md'
import { IDiscussion } from '../Communicator'

function Discussion({ title, name, date, text, views, comments }: IDiscussion) {
  return (
    <div className={style.discussion}>
      <div className={style.discussion_head}>
        <h2 className={style.discussion_title}>{title}</h2>
        <div className={style.discussion_info}>
          <div className={style.discussion_user}>
            <p className={style.discussion_user_name}>{name}</p>
          </div>
          <div className={style.discussion_period}>{date}</div>
        </div>
      </div>
      <div className={style.discussion_text}>{text}</div>
      <div className={style.controlState}>
        <div className={style.controlState_rate}>
          <IoIosArrowUp />
          3
          <IoIosArrowDown />
        </div>
        <div className={style.controlState_views}>
          <MdOutlineRemoveRedEye /> {views}
        </div>
        <div className={style.controlState_comments}>
          <MdOutlineModeComment /> {comments}
        </div>
        <div className={style.controlState_bookmark}>
          <MdOutlineBookmarkBorder />
        </div>
      </div>
    </div>
  )
}

export default Discussion
