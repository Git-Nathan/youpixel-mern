import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchChannel } from '~/api/api'
import styles from './WatchVideoBox.module.scss'

const cn = classNames.bind(styles)

function WatchVideoBox({ video }) {
  const [channel, setChannel] = useState({})

  let videoDuration

  if (video.duration < 3600) {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(14, 19)
  } else {
    videoDuration = new Date(video.duration * 1000).toISOString().slice(11, 19)
  }

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await fetchChannel(video.userId)
      setChannel(data)
    }
    getChannel()
  }, [video.userId])

  return (
    <Link className={cn('wrapper')}>
      <div
        className={cn('video-img')}
        style={{
          backgroundImage: `url(${video.imgUrl})`,
        }}
      ></div>

      <div className={cn('video-detail')}>
        <div className={cn('video-detail-name')}>{video.title}</div>
        <div className={cn('video-detail-author')}>{channel.name}</div>
        <div className={cn('views-and-time')}>
          <span>100 lượt xem</span>
          <span className={cn('timer')}>2 ngày trước</span>
        </div>
      </div>
    </Link>
  )
}

export default WatchVideoBox
