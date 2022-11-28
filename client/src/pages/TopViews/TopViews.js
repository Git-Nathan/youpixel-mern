import styles from './TopViews.module.scss'
import classNames from 'classnames/bind'
import SearchVideoBox from '~/components/Boxs/SearchVideoBox'
import { useEffect, useState } from 'react'
import { getTopView } from '~/api/api'

const cn = classNames.bind(styles)

function TopViews() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await getTopView()
      setVideos(data.videos)
    }
    getdata()
  }, [])

  return (
    <>
      <div className={cn('wrapper-title')}>
        <img
          className={cn('title-img')}
          src="https://www.youtube.com/img/trending/avatar/trending_avatar.png"
          alt="title img"
        />

        <h2 className={cn('channel-name')}>Xu hướng</h2>
      </div>
      <div className={cn('separate')}></div>
      <div className={cn('wrapper-videos')}>
        {videos.map((video) => (
          <SearchVideoBox key={video._id} video={video} />
        ))}
      </div>
    </>
  )
}

export default TopViews
