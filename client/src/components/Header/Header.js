import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import logo from '~/assets/images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'
import GoogleLogin from 'react-google-login'
import { SidebarIcon } from '../icons'

const cn = classNames.bind(styles)

const clientId =
  '36544663310-0512r1nrq8bvjivhljra35ljsev49ct0.apps.googleusercontent.com'

function Header() {
  const googleSuccess = async (res) => {
    const result = res?.profileObj
    // const token = res?.tokenId

    try {
      // dispatch({ type: AUTH, data: { result, token } })
      console.log(result)

      // navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = () =>
    console.log('Google Sign In was unsuccessful. Try again later')

  return (
    <header className={cn('wrapper')}>
      <div className={cn('inner')}>
        <div className={cn('start')}>
          <button className={cn('sidebar-btn')}>
            <SidebarIcon height="25px" />
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
          {/* <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
              <div className={cn('login-box')} onClick={renderProps.onClick}>
                <div className={cn('login-box-btn')}>
                  <FontAwesomeIcon
                    className={cn('login-box-btn-icon')}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  Đăng nhập
                </div>
              </div>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          /> */}
        </div>
      </div>
    </header>
  )
}

export default Header
