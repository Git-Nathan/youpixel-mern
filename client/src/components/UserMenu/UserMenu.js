import classNames from 'classnames/bind'
import { memo } from 'react'
import { HomeIcon } from '../icons'
import styles from './UserMenu.module.scss'
import { UserMenuItem } from './UserMenuItem'

const cn = classNames.bind(styles)

function UserMenu({ currentUser, logout }) {
  return (
    <item className={cn('user-menu')}>
      <div className={cn('user-menu-info-box')}>
        <img
          className={cn('user-menu-img')}
          src={currentUser.picture}
          alt="user img"
        />
        <div className={cn('user-menu-name')}>{currentUser.name}</div>
      </div>
      <div className={cn('group-btn')}>
        <UserMenuItem title="Kênh của bạn" icon={<HomeIcon />}></UserMenuItem>
        <UserMenuItem
          to="/studio/videos/upload"
          title="Quản lý kênh"
          icon={<HomeIcon />}
        ></UserMenuItem>
        <button className={cn('logout-btn')} onClick={logout}>
          <span className={cn('logout-icon')}>
            <HomeIcon fill="white" />
          </span>
          <span className={cn('logout-text')}>Đăng xuất</span>
        </button>
      </div>
    </item>
  )
}

export default memo(UserMenu)
