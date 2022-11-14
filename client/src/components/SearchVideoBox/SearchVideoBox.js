import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './SearchVideoBox.module.scss'

const cn = classNames.bind(styles)

function SearchVideoBox() {
  return (
    <div className={cn('wrapper')}>
      <img
        className={cn('video-img')}
        src="https://i.ytimg.com/vi/FWNdhysYxwc/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCHYe52nyNC_2KRGpY1tOZzumyjPQ"
        alt="video-img"
      />
      <div className={cn('video-details')}>
        <div className={cn('video-name')}>
          Đây là tên video mà nó ngắn quá nên mình ghi thêm thế này cho nó dài
          ra maf vaaxn chua dur dafi neen mifnh ghi tieesp vafo nhuw thees nafy
        </div>
        <div className={cn('views-and-time')}>
          <span>100 lượt xem</span>
          <span className={cn('timer')}>2 ngày trước</span>
        </div>
        <Link className={cn('author')}>
          <img
            className={cn('author-img')}
            src="https://yt3.ggpht.com/yc6EL14g0qHwprb7fZTQN9pYPvzxeJUO2TkxpWJWhApPJCQTSjPfdZBiC1nbGjVLdoTXm_TR1Q=s68-c-k-c0x00ffffff-no-rj"
            alt="author"
          />
          <div className={cn('author-name')}>Tên Tác Giả</div>
        </Link>
        <div className={cn('video-desc')}>
          Đây là tên video mà nó ngắn quá nên mình ghi thêm thế này cho nó dài
          ra maf vaaxn chua dur dafi neen mifnh ghi tieesp vafo nhuw thees nafy
        </div>
      </div>
    </div>
  )
}

export default SearchVideoBox
