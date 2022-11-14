import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import logo from '~/assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'
import { NotificationIcon, SidebarIcon, UploadIcon } from '../icons'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import UserMenu from '../UserMenu'
import { useDispatch } from 'react-redux'
import { signin } from '~/actions/authActions'
import { useCallback, useEffect, useState } from 'react'
import { LOGOUT } from '~/constants/actionsTypes'

const cn = classNames.bind(styles)

function Header() {
  const dispatch = useDispatch()
  const [currentUser, setcurrentUser] = useState(false)

  // console.log(currentUser)

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

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT })
    setcurrentUser(null)
  }, [dispatch])

  useEffect(() => {
    // setcurrentUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  return (
    <header className={cn('wrapper')}>
      <div className={cn('inner')}>
        <div className={cn('start')}>
          <div className={cn('sidebar-btn')}>
            <SidebarIcon height="25px" />
          </div>
          <Link to="/" className={cn('logo-link')}>
            <img className={cn('logo-img')} src={logo} alt="logo" />
          </Link>
          <SearchBar />
        </div>

        <div className={cn('end')}>
          {currentUser ? (
            <>
              <div className={cn('upload-btn')}>
                <UploadIcon className={cn('upload-icon')} />
                Tạo video
              </div>
              <div className={cn('notification-btn')}>
                <NotificationIcon className={cn('notification-icon')} />
              </div>
              <div className={cn('user-box')}>
                <img
                  className={cn('user-img')}
                  src={currentUser.picture}
                  alt="user img"
                />

                <UserMenu currentUser={currentUser} logout={logout} />
              </div>
            </>
          ) : (
            <>
              <button className={cn('menu-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
              </button>
              <div className={cn('login-box')}>
                <div className={cn('login-box-btn')} onClick={() => login()}>
                  <FontAwesomeIcon
                    className={cn('login-box-btn-icon')}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  <span>Đăng nhập</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
