import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchChannel } from '~/api/api'
import styles from './VideoBox.module.scss'

const cn = classNames.bind(styles)

function VideoBox({ video }) {
  const [channel, setChannel] = useState({})
  console.log(channel)

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await fetchChannel(video.userId)
      setChannel(data)
    }
    getChannel()
  }, [video.userId])

  return (
    <div className={cn('grid__column')}>
      <div className={cn('wrapper')}>
        <div className={cn('thumbnail-box')}>
          <Link className={cn('thumbnail-link')} to="/watch">
            <img
              className={cn('thumbnail')}
              src={video.imgUrl}
              alt="thumbnail"
            ></img>
          </Link>
        </div>
        <div className={cn('videobox-detail')}>
          <div className={cn('author-img-box')}>
            <Link>
              <img
                className={cn('author-img')}
                src={channel.picture}
                alt="User avatar"
              />
            </Link>
          </div>
          <div className={cn('detail')}>
            <Link className={cn('video-link')}>
              <h4 className={cn('video-name')}>{video.title}</h4>
            </Link>
            <Link className={cn('author-name')}>{channel.name}</Link>
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
