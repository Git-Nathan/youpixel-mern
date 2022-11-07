import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { MenuItem } from './Menu'

const cn = classNames.bind(styles)

function Sidebar() {
  return (
    <aside className={cn('wrapper')}>
      <nav
        className={cn('nav-box')}
        style={{ borderTop: 'none', marginTop: '0' }}
      >
        <MenuItem title="Trang chủ"></MenuItem>
        <MenuItem title="Kênh đăng ký"></MenuItem>
      </nav>
      <nav className={cn('nav-box')}>
        <MenuItem title="Video đã xem"></MenuItem>
        <MenuItem title="Video của bạn"></MenuItem>
        <MenuItem title="Video đã thích"></MenuItem>
      </nav>
      <nav className={cn('nav-box')}>
        <h3 className={cn('nav-box-title')}>Khám phá</h3>
        <MenuItem title="Top lượt xem"></MenuItem>
        <MenuItem title="Top like"></MenuItem>
        <MenuItem title="Top người đăng ký"></MenuItem>
      </nav>
      <nav className={cn('nav-box')}>
        <MenuItem title="Cài đặt"></MenuItem>
        <MenuItem title="Trợ giúp"></MenuItem>
        <MenuItem title="Gửi phản hồi"></MenuItem>
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
        <div className={cn('footer-box')} style={{ paddingTop: '12px' }}>
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
