import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchChannel } from '~/api/api'
import styles from './SearchVideoBox.module.scss'

const cn = classNames.bind(styles)

function SearchVideoBox({ video }) {
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await fetchChannel(video.userId)
      setChannel(data)
    }
    getChannel()
  }, [video.userId])

  return (
    <div className={cn('wrapper')}>
      <img className={cn('video-img')} src={video.imgUrl} alt="video-img" />
      <div className={cn('video-details')}>
        <div className={cn('video-name')}>{video.title}</div>
        <div className={cn('views-and-time')}>
          <span>{video.views} lượt xem</span>
          <span className={cn('timer')}>2 ngày trước</span>
        </div>
        <Link className={cn('author')}>
          {channel?.picture ? (
            <>
              <img
                className={cn('author-img')}
                src={channel.picture}
                alt="author"
              />
              <div className={cn('author-name')}>{channel.name}</div>
            </>
          ) : (
            <>
              <div className={cn('author-img')}></div>
              <div className={cn('author-name-load')}></div>
            </>
          )}
        </Link>
        <div className={cn('video-desc')}>{video.desc}</div>
      </div>
    </div>
  )
}

export default SearchVideoBox
