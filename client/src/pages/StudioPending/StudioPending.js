import styles from './StudioPending.module.scss'
import classNames from 'classnames/bind'
import StudioPendingBox from '~/components/StudioPendingBox'
import { useEffect, useState } from 'react'
import { getUserVideosPending } from '~/api/api'
import { CircularProgress } from '@mui/material'

const cn = classNames.bind(styles)

function StudioPending() {
  const currentUser = JSON.parse(localStorage.getItem('profile'))
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await getUserVideosPending(currentUser?.result._id)
      setVideos(data.videos)
      setLoading(false)
    }
    getdata()
  }, [currentUser?.result._id])

  if (loading) {
    return (
      <div className={cn('loadingPaper')}>
        <CircularProgress className={cn('circularProgress')} size="5em" />
      </div>
    )
  }

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
          <th style={{ textAlign: 'right', width: '20%', padding: '0 12px' }}>
            Trạng thái
          </th>
        </tr>
        {videos.length === 0 && (
          <div style={{ marginTop: '12px' }}>Không có video nào</div>
        )}
        {videos.map((video) => (
          <StudioPendingBox key={video._id} video={video} />
        ))}
      </table>
    </div>
  )
}

export default StudioPending
