import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { MenuItem } from './Menu'
import {
  FeedbackIcon,
  HelpIcon,
  HomeIcon,
  LikedIcon,
  MyVideosIcon,
  SettingsIcon,
  SubcribedIcon,
  TopSubcribedIcon,
  TopWatchIcon,
  WatchedIcon,
} from '../icons'
import config from '~/config'

const cn = classNames.bind(styles)

function Sidebar() {
  return (
    <aside className={cn('wrapper')}>
      <nav className={cn('nav-wrap')}>
        <div
          className={cn('nav-box')}
          style={{ borderTop: 'none', marginTop: '0' }}
        >
          <MenuItem
            to={config.routes.home}
            title="Trang chủ"
            icon={<HomeIcon />}
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Kênh đăng ký"
            icon={<SubcribedIcon />}
          ></MenuItem>
        </div>
        <div className={cn('nav-box')}>
          <MenuItem
            to={'/notyet'}
            title="Video đã xem"
            icon={<WatchedIcon />}
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Video của bạn"
            icon={<MyVideosIcon />}
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Video đã thích"
            icon={<LikedIcon />}
          ></MenuItem>
        </div>
        <div className={cn('nav-box')}>
          <h3 className={cn('nav-box-title')}>Khám phá</h3>
          <MenuItem
            to={config.routes.topviews}
            title="Top lượt xem"
            icon={<TopWatchIcon />}
          ></MenuItem>
          <MenuItem to={'/notyet'} title="Top like"></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Top người đăng ký"
            icon={<TopSubcribedIcon />}
          ></MenuItem>
        </div>
        <div className={cn('nav-box')}>
          <MenuItem
            to={'/notyet'}
            title="Cài đặt"
            icon={<SettingsIcon />}
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Trợ giúp"
            icon={<HelpIcon />}
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Gửi phản hồi"
            icon={<FeedbackIcon />}
          ></MenuItem>
        </div>
      </nav>
      <div className={cn('footer')}>
        <div className={cn('footer-box')}>
          <div className={cn('footer-link')}>Giới thiệu</div>
          <div className={cn('footer-link')}>Điều khoản</div>
          <div className={cn('footer-link')}>Quyền riêng tư</div>
          <div className={cn('footer-link')}>Chích sách và an toàn</div>
          <div className={cn('footer-link')}>Cách YouPixels hoạt động</div>
          <div className={cn('footer-link')}>Thử các tính năng mới</div>
        </div>
        <div className={cn('footer-box')} style={{ padding: '16px 12px' }}>
          <div className={cn('footer-link')}>Một sản phẩm của:</div>
          <div className={cn('footer-link')}>Ngô Văn Thuần</div>
          <div className={cn('footer-link')}>Trịnh Thị Anh</div>
          <div className={cn('footer-link')}>Bùi Quang Thắng</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
