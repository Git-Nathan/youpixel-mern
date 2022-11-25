import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './SubcribeButton.module.scss'
import { useState } from 'react'

const cn = classNames.bind(styles)

function SubcribeButton({ currentUser, channel, handleSub, handleLogin }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {currentUser ? (
        <>
          {currentUser?.result._id === channel._id ? (
            <Link to="/studio/videos/upload" className={cn('sub-btn')}>
              Quản lý kênh
            </Link>
          ) : (
            <>
              {currentUser?.result.subscribedUsers.includes(channel._id) ? (
                <button className={cn('sub-btn')} onClick={() => setOpen(true)}>
                  Đã đăng ký
                </button>
              ) : (
                <button className={cn('sub-btn')} onClick={handleSub}>
                  Đăng ký
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <button className={cn('sub-btn')} onClick={handleLogin}>
          Đăng ký
        </button>
      )}
      {open && (
        <div className={cn('confirm-overlay')} onClick={() => setOpen(false)}>
          <div className={cn('confirm-wrapper')}>
            <div
              className={cn('confirm-text')}
            >{`Hủy đăng ký ${channel.name}`}</div>
            <div className={cn('confirm-btn')}>
              <button
                className={cn('close-btn')}
                onClick={() => setOpen(false)}
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  handleSub()
                }}
                className={cn('close-btn', 'accept-btn')}
              >
                Hủy đăng ký
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SubcribeButton
