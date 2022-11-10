import styles from './Watch.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import WatchVideoBoxs from '~/components/WatchVideoBoxs/WatchVideoBoxs'

const cn = classNames.bind(styles)

function Watch() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('primary')}>
        <div className={cn('video-wrapper')}></div>
      </div>
      <div className={cn('secondary')}>
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
        <WatchVideoBoxs />
      </div>
    </div>
  )
}

export default Watch
