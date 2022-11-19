import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import VideoBoxs from '~/components/VideoBoxs'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchVideos } from '~/actions/videoActions'

const cn = classNames.bind(styles)

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    dispatch(fetchVideos())
  }, [dispatch])

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
