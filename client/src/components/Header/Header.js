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

const cn = classNames.bind(styles)

function Header() {
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
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    },
  })

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
          {/* <button className={cn('menu-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </button>
          <div className={cn('login-box')}>
            <div className={cn('login-box-btn')} onClick={() => login()}>
              <FontAwesomeIcon
                className={cn('login-box-btn-icon')}
                icon={faUser}
              ></FontAwesomeIcon>
              Đăng nhập
            </div>
          </div> */}

          <div className={cn('upload-btn')}>
            <UploadIcon className={cn('upload-icon')} /> Tạo video
          </div>
          <div className={cn('notification-btn')}>
            <NotificationIcon className={cn('notification-icon')} />
          </div>
          <div className={cn('user-box')}>
            <img
              className={cn('user-img')}
              src="https://lh3.googleusercontent.com/a/ALm5wu2IGYTzIgPQZsVlP3NMlVc45QHcC52_hpLlBYbnwA=s96-c"
              alt="user img"
            />
            <div className={cn('user-menu')}>
              <div className={cn('user-menu-info-box')}>
                <img
                  className={cn('user-menu-img')}
                  src="https://lh3.googleusercontent.com/a/ALm5wu2IGYTzIgPQZsVlP3NMlVc45QHcC52_hpLlBYbnwA=s96-c"
                  alt="user img"
                />
                <div className={cn('user-menu-name')}>Tên người dùng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
