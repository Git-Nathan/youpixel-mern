import styles from './StudioVideos.module.scss'
import classNames from 'classnames/bind'
import StudioVideoBox from '~/components/StudioVideoBox'
import { useEffect, useState } from 'react'
import { getUserVideos } from '~/api/api'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

const cn = classNames.bind(styles)

function StudioVideos() {
  const { reload } = useSelector((store) => store.videoReducer)
  const currentUser = JSON.parse(localStorage.getItem('profile'))
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getdata = async () => {
      const { data } = await getUserVideos(currentUser?.result._id)
      setVideos(data.videos)
      setLoading(false)
    }
    getdata()
  }, [currentUser?.result._id, reload])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

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
          <th style={{ textAlign: 'left', width: '16%', padding: '0 12px' }}>
            Ngày tải lên
          </th>
          <th style={{ textAlign: 'right', padding: '0 12px' }}>Số lượt xem</th>
          <th style={{ textAlign: 'right', padding: '0 12px' }}>
            Số bình luận
          </th>
          <th style={{ textAlign: 'right', width: '16%', padding: '0 12px' }}>
            Lượt thích(%)
          </th>
        </tr>
        {videos.length === 0 && !loading && (
          <div style={{ marginTop: '12px' }}>Không có video nào</div>
        )}
        {videos.map((video) => (
          <StudioVideoBox key={video._id} video={video} />
        ))}
      </table>
    </div>
  )
}

export default StudioVideos
