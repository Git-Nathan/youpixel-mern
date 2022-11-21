import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './SubcribeButton.module.scss'
import { useGoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { signin } from '~/actions/authActions'

const cn = classNames.bind(styles)

function SubcribeButton({ currentUser, channel, handleSub }) {
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          },
        )
        dispatch(
          signin({
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
          }),
        )
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <>
      {currentUser ? (
        <>
          {currentUser?.result._id === channel._id ? (
            <Link className={cn('sub-btn')}>Quản lý kênh</Link>
          ) : (
            <button className={cn('sub-btn')} onClick={handleSub}>
              {currentUser?.result.subscribedUsers.includes(channel._id)
                ? 'Đã đăng ký'
                : 'Đăng ký'}
            </button>
          )}
        </>
      ) : (
        <button className={cn('sub-btn')} onClick={login}>
          Đăng ký
        </button>
      )}
    </>
  )
}

export default SubcribeButton
