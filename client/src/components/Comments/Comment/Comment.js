import styles from './Comment.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { fetchChannel } from '~/api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { DeleteIcon } from '~/components/icons'
import { useDispatch } from 'react-redux'
import { deleteComment } from '~/actions/commentActions'

const cn = classNames.bind(styles)

function Comment({ comment, currentUser, setUpdate, notify }) {
  const [channel, setChannel] = useState({})
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await fetchChannel(comment.userId)
      setChannel(data)
    }
    getChannel()
  }, [comment.userId])

  const handerDelete = async () => {
    dispatch(deleteComment(comment._id, setUpdate, notify))
  }

  return (
    <>
      <div className={cn('wrappper')}>
        {channel?.picture && channel?.name ? (
          <>
            <div className={cn('left')}>
              <img
                className={cn('user-img')}
                src={channel.picture}
                alt="UserImg"
              />
              <div className={cn('detail-wrap')}>
                <div className={cn('user-name')}>{channel.name}</div>
                <div className={cn('comment')}>{comment.desc}</div>
              </div>
            </div>
            {currentUser?.result._id === channel._id && (
              <>
                <div>
                  <button
                    className={cn('menu-btn', 'deletable')}
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                    ></FontAwesomeIcon>
                  </button>

                  {open && (
                    <>
                      <div className={cn('menu-wrapper')}>
                        <button
                          className={cn('menu-item')}
                          onClick={handerDelete}
                        >
                          <DeleteIcon />
                          <span className={cn('menu-text')}>Xóa</span>
                        </button>
                      </div>
                      <div
                        className={cn('overlay')}
                        onClick={() => {
                          setOpen(false)
                        }}
                      ></div>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className={cn('user-img')}></div>
            <div className={cn('detail-wrap')}>
              <div className={cn('user-name', 'user-name-loading')}></div>
              <div className={cn('comment', 'comment-loading')}></div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Comment
