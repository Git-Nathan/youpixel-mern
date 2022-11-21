import styles from './Comments.module.scss'
import classNames from 'classnames/bind'
import unName from '~/assets/images/unnamed.jpg'
import { useState } from 'react'
import { async } from '@firebase/util'
import { useDispatch } from 'react-redux'
import { addComment } from '~/actions/commentActions'

const cn = classNames.bind(styles)

function Comments({ videoId, currentUser }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleComment = async () => {
    dispatch(addComment(comment, videoId))
  }

  return (
    <>
      <div className={cn('comment-box')}>
        {currentUser ? (
          <img
            referrerPolicy="no-referrer"
            className={cn('user-img')}
            src={currentUser?.result.picture}
            alt="UserImg"
          />
        ) : (
          <img className={cn('user-img')} src={unName} alt="UserImg" />
        )}

        <div className={cn('comment-imput-wrapper')}>
          <textarea
            className={cn('comment-imput')}
            placeholder="Viết bình luận..."
            rows="1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onClick={() => {
              setOpen(true)
            }}
          ></textarea>
          {open && (
            <div className={cn('comment-btn')}>
              <button
                className={cn('btn', 'close-btn')}
                onClick={() => {
                  setComment('')
                  setOpen(false)
                }}
              >
                Hủy
              </button>
              {comment.length > 0 ? (
                <button
                  className={cn('btn', 'btn-active')}
                  onClick={() => {
                    handleComment()
                    setComment('')
                    setOpen(false)
                  }}
                >
                  Bình luận
                </button>
              ) : (
                <div className={cn('btn', 'btn-inactive')}>Bình luận</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
