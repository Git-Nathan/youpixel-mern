import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import VideoBoxs from '~/components/Boxs/VideoBoxs'

const cn = classNames.bind(styles)

function Home() {
  return (
    <div className={cn('grid')}>
      <div className={cn('filter-bar')}>
        <div className={cn('filter-bar-box')}>
          <Link className={cn('filter-bar-link')}>Tất cả</Link>
          <Link className={cn('filter-bar-link')}>Danh sách kết hợp</Link>
          <Link className={cn('filter-bar-link')}>Trực tiếp</Link>
          <Link className={cn('filter-bar-link')}>Âm nhạc</Link>
          <Link className={cn('filter-bar-link')}>Mới tải lên gần đây</Link>
          <Link className={cn('filter-bar-link')}>Đã xem</Link>
          <Link className={cn('filter-bar-link')}>Đề xuất mới</Link>
        </div>
      </div>
      <div className={cn('margin')}></div>
      <VideoBoxs />
    </div>
  )
}

export default Home
