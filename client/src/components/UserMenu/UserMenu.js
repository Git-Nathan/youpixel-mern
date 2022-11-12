import classNames from 'classnames/bind'
import { HomeIcon } from '../icons'
import styles from './UserMenu.module.scss'
import { UserMenuItem } from './UserMenuItem'

const cn = classNames.bind(styles)

function UserMenu() {
  return (
    <item className={cn('user-menu')}>
      <div className={cn('user-menu-info-box')}>
        <img
          className={cn('user-menu-img')}
          src="https://lh3.googleusercontent.com/a/ALm5wu2IGYTzIgPQZsVlP3NMlVc45QHcC52_hpLlBYbnwA=s96-c"
          alt="user img"
        />
        <div className={cn('user-menu-name')}>Tên người dùng</div>
      </div>
      <div className={cn('group-btn')}>
        <UserMenuItem title="Kênh của bạn" icon={<HomeIcon />}></UserMenuItem>
        <UserMenuItem
          to="/studio/videos"
          title="Quản lý kênh"
          icon={<HomeIcon />}
        ></UserMenuItem>
        <UserMenuItem title="Đăng xuất" icon={<HomeIcon />}></UserMenuItem>
      </div>
    </item>
  )
}

export default UserMenu
