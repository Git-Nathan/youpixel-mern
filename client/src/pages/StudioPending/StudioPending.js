import styles from './StudioPending.module.scss'
import classNames from 'classnames/bind'
import StudioPendingBox from '~/components/StudioPendingBox'
import { useEffect, useState } from 'react'
import { getUserVideosPending } from '~/api/api'

const cn = classNames.bind(styles)

function StudioPending() {
  const currentUser = JSON.parse(localStorage.getItem('profile'))
  const [videos, setVideos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await getUserVideosPending(currentUser?.result._id)
      setVideos(data.videos)
    }
    getdata()
  }, [currentUser?.result._id])

  return (
    <div className={cn('wrapper')}>
      <table className={cn('table')}>
        <tr>
          <th style={{ textAlign: 'left', width: '45%', paddingLeft: '24px' }}>
            Video
          </th>
          <th style={{ textAlign: 'left', padding: '0 12px' }}>Tùy chọn</th>
          <th style={{ textAlign: 'right', width: '16%', padding: '0 12px' }}>
            Ngày tải lên
          </th>
          <th style={{ textAlign: 'right', width: '16%', padding: '0 12px' }}>
            Trạng thái
          </th>
        </tr>
        {videos.map((video) => (
          <StudioPendingBox key={video._id} video={video} />
        ))}
      </table>
    </div>
  )
}

export default StudioPending
