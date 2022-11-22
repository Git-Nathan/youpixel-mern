import styles from './StudioVideos.module.scss'
import classNames from 'classnames/bind'
import StudioVideoBox from '~/components/StudioVideoBox'
import { useEffect, useState } from 'react'
import { getUserVideos } from '~/api/api'

const cn = classNames.bind(styles)

function StudioVideos() {
  const currentUser = JSON.parse(localStorage.getItem('profile'))
  const [videos, setVideos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await getUserVideos(currentUser?.result._id)
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
        {videos.map((video) => (
          <StudioVideoBox key={video._id} video={video} />
        ))}
      </table>
    </div>
  )
}

export default StudioVideos
