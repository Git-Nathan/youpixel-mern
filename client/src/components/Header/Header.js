import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import logo from '~/assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'
import { SidebarIcon, UploadIcon } from '../icons'
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
        </div>
      </div>
    </header>
  )
}

export default Header
