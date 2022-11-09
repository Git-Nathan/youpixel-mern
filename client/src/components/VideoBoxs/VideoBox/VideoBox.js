import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './VideoBox.module.scss'

const cn = classNames.bind(styles)

function VideoBox() {
  return (
    <div className={cn('grid__column')}>
      <div className={cn('wrapper')}>
        <div className={cn('thumbnail-box')}>
          <Link className={cn('thumbnail-link')} to="/watch">
            <img
              className={cn('thumbnail')}
              src="https://i.ytimg.com/vi/26Ny49WLWr0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB5zhzrlwZesJmU707qh-wLBz3VJA"
              alt="thumbnail"
            ></img>
          </Link>
        </div>
        <div className={cn('videobox-detail')}>
          <div className={cn('author-img-box')}>
            <Link>
              <img
                className={cn('author-img')}
                src="https://yt3.ggpht.com/ytc/AMLnZu8z37ZcdRrrOE5UccnysTQ5ort1CIj3SpofDjR9Kso=s68-c-k-c0x00ffffff-no-rj"
                alt="User avatar"
              />
            </Link>
          </div>
          <div className={cn('detail')}>
            <Link className={cn('video-link')}>
              <h4 className={cn('video-name')}>
                Đây là tên video ko biết ghi gì cho dài nên ghi như này nhưng
                vẫn chưa đủ dài nên ghi thêm cho dài hơn
              </h4>
            </Link>
            <Link className={cn('author-name')}>Tên tác giả</Link>
            <div className={cn('views-and-time')}>
              <span>100 lượt xem</span>
              <span className={cn('timer')}>2 ngày trước</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoBox
