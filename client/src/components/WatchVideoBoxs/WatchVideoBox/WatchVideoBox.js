import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './WatchVideoBox.module.scss'

const cn = classNames.bind(styles)

function WatchVideoBox() {
  return (
    <Link className={cn('wrapper')}>
      <img
        className={cn('video-img')}
        src="https://i.ytimg.com/vi/meXg2pkP-o8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDr7p7RFcRfFunjiEOlckqvqYiyNw"
        alt="video omg"
      />

      <div className={cn('video-detail')}>
        <div className={cn('video-detail-name')}>
          Đây là tên video mà nó ngắn quá nên mình ghi thêm thế này cho nó dài
          ra
        </div>
        <div className={cn('video-detail-author')}>Tên tác giả</div>
        <div className={cn('views-and-time')}>
          <span>100 lượt xem</span>
          <span className={cn('timer')}>2 ngày trước</span>
        </div>
      </div>
    </Link>
  )
}

export default WatchVideoBox
