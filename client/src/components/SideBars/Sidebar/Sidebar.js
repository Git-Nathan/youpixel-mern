import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { MenuItem } from './Menu'
import {
  FeedbackIcon,
  HelpIcon,
  HomeIcon,
  HomeIconActive,
  LikeIcon,
  MyVideosIcon,
  SettingsIcon,
  TopViewsIcon,
  TopViewsIconActive,
  WatchedIcon,
  WatchedIconActive,
} from '../../icons'

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
            to={'/'}
            title="Trang chủ"
            icon={<HomeIcon />}
            activeIcon={<HomeIconActive />}
          ></MenuItem>
          {/* <MenuItem
            to={'/notyet'}
            title="Kênh đăng ký"
            icon={<SubcribedIcon />}
          ></MenuItem> */}
        </div>
        <div className={cn('nav-box')}>
          <MenuItem
            to={'/feed/history'}
            title="Video đã xem"
            icon={<WatchedIcon />}
            activeIcon={<WatchedIconActive />}
          ></MenuItem>
          <MenuItem
            to={'/studio/videos/upload'}
            title="Video của bạn"
            icon={<MyVideosIcon />}
          ></MenuItem>
          <MenuItem
            to={'/liked'}
            title="Video đã thích"
            icon={<LikeIcon pathFill="white" />}
            activeIcon={<LikeIcon pathFill="var(--primary-color)" />}
          ></MenuItem>
        </div>
        <div className={cn('nav-box')}>
          <h3 className={cn('nav-box-title')}>Khám phá</h3>
          <MenuItem
            to={'/topviews'}
            title="Xu hướng"
            icon={<TopViewsIcon />}
            activeIcon={<TopViewsIconActive />}
          ></MenuItem>
          {/* <MenuItem
            to={'/notyet'}
            title="Top liked"
            icon={<TopLikesIcon />}
          ></MenuItem> */}
          {/* <MenuItem
            to={'/notyet'}
            title="Top người đăng ký"
            icon={<TopSubcribedIcon />}
          ></MenuItem> */}
        </div>
        <div className={cn('nav-box')}>
          <MenuItem
            to={'/notyet'}
            title="Cài đặt"
            icon={<SettingsIcon />}
            unusable
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Trợ giúp"
            icon={<HelpIcon />}
            unusable
          ></MenuItem>
          <MenuItem
            to={'/notyet'}
            title="Gửi phản hồi"
            icon={<FeedbackIcon />}
            unusable
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
