import styles from './StudioVideoBox.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { getComments } from '~/api/api'
import Moment from 'react-moment'
import 'moment/locale/vi'

const cn = classNames.bind(styles)

function StudioVideoBox({ video }) {
  const [comments, setComments] = useState([])

  const likePercent =
    (video.likes.length / (video.likes.length + video.dislikes.length)) * 100

  useEffect(() => {
    const Comments = async () => {
      const { data } = await getComments(video._id)
      setComments(data)
    }
    Comments()
  }, [video._id])

  return (
    <tr className={cn('video-row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <img className={cn('video-img')} src={video.imgUrl} alt="video img" />
        <div className={cn('video-col-end')}>
          <div className={cn('video-name')}>{video.title}</div>
          <div className={cn('video-desc')}>{video.desc}</div>
        </div>
      </td>
      <td style={{ padding: '12px' }}>
        <Moment format="Do MMM, YYYY">{video.createdAt}</Moment>
      </td>
      <td style={{ textAlign: 'right' }}>{video.views}</td>
      <td style={{ textAlign: 'right' }}>{comments.length}</td>
      <td style={{ textAlign: 'right' }}>
        <div>{likePercent}%</div>
        <div style={{ color: 'var(--text-color-darker)' }}>
          {video.likes.length} lượt thích
        </div>
      </td>
    </tr>
  )
}

export default StudioVideoBox
