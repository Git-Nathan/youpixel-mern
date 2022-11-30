import classNames from 'classnames/bind'
import styles from './WatchVideoBoxs.module.scss'
import WatchVideoBox from './WatchVideoBox'
import { useEffect, useState } from 'react'
import { fetchVideos } from '~/api/api'
import Loading from '~/components/Loading'

const cn = classNames.bind(styles)

function WatchVideoBoxs() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await fetchVideos()
      setVideos(data.data)
      setLoading(false)
    }
    getdata()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className={cn('wrapper')}>
      {videos?.map((video) => (
        <WatchVideoBox key={video._id} video={video} />
      ))}
    </div>
  )
}

export default WatchVideoBoxs
