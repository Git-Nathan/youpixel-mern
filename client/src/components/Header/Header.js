import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import logo from '~/assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'

const cn = classNames.bind(styles)

function Header() {
  return (
    <header className={cn('wrapper')}>
      <div className={cn('inner')}>
        <div className={cn('start')}>
          <button className={cn('sidebar-btn')}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5H21"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.53 10H21"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 15H21"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.53 20H21"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <Link to="/" className={cn('logo-link')}>
            <img className={cn('logo-img')} src={logo} alt="logo" />
          </Link>
          <SearchBar />
        </div>

        <div className={cn('end')}>
          <button className={cn('menu-btn')}>
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </button>
          <Link className={cn('login-box')}>
            <div className={cn('login-box-btn')}>
              <FontAwesomeIcon
                className={cn('login-box-btn-icon')}
                icon={faUser}
              ></FontAwesomeIcon>
              Đăng nhập
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
