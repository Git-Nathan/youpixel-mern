import styles from './Watch.module.scss'
import classNames from 'classnames/bind'
import { Link, useSearchParams } from 'react-router-dom'
import WatchVideoBoxs from '~/components/WatchVideoBoxs/WatchVideoBoxs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo } from '~/actions/videoActions'
import { CircularProgress, Paper } from '@mui/material'
import ReactPlayer from 'react-player'

const cn = classNames.bind(styles)

function Watch() {
  const { video, isLoading } = useSelector((store) => store.videoReducer)
  const [searchParams] = useSearchParams({})
  const dispatch = useDispatch()

  const videoId = searchParams.get('v')

  useEffect(() => {
    dispatch(getVideo(videoId))
  }, [dispatch, videoId])

  if (isLoading) {
    return (
      <Paper
        style={{ backgroundColor: '#15141b' }}
        elevation={6}
        className={cn('loadingPaper')}
      >
        <CircularProgress className={cn('circularProgress')} size="5em" />
      </Paper>
    )
  }

  return (
    <div className={cn('wrapper')}>
      <div className={cn('primary')}>
        <video
          className={cn('video-wrapper')}
          src={video.videoUrl}
          controls
          autoPlay
        ></video>
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
