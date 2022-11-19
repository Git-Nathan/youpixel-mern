import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchChannel } from '~/api/api'
import styles from './VideoBox.module.scss'
import Moment from 'react-moment'
import 'moment/locale/vi'

const cn = classNames.bind(styles)

function VideoBox({ video }) {
  const [channel, setChannel] = useState({})

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
          <Link to={`/watch?v=${video._id}`} className={cn('thumbnail-link')}>
            {video?.imgUrl ? (
              <img
                className={cn('thumbnail')}
                src={video?.imgUrl}
                alt="thumbnail"
              ></img>
            ) : (
              <div className={cn('thumbnail-loading')}></div>
            )}
          </Link>
        </div>
        <div className={cn('videobox-detail')}>
          <div className={cn('author-img-box')}>
            {channel?.picture ? (
              <Link to={`/channel/${video.userId}`}>
                <img
                  referrerPolicy="no-referrer"
                  className={cn('author-img')}
                  src={channel.picture}
                  alt="User avatar"
                />
              </Link>
            ) : (
              <div className={cn('author-img-loading')}></div>
            )}
          </div>
          <div className={cn('detail')}>
            <Link to={`/watch?v=${video._id}`} className={cn('video-link')}>
              <h4 className={cn('video-name')}>{video.title}</h4>
            </Link>
            {channel?.name ? (
              <Link
                to={`/channel/${video.userId}`}
                className={cn('author-name')}
              >
                {channel.name}
              </Link>
            ) : (
              <div className={cn('channel-name-loading')}></div>
            )}
            <div className={cn('views-and-time')}>
              <span>{video.views} lượt xem</span>
              <span className={cn('timer')}>
                <Moment fromNow>{video.createdAt}</Moment>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoBox
