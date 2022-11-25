import styles from './StudioPendingBox.module.scss'
import classNames from 'classnames/bind'
import { EditIcon, TrashIcon } from '../icons'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const cn = classNames.bind(styles)

function StudioPendingBox({ video }) {
  console.log(video.status)

  return (
    <tr className={cn('video-row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <div style={{ display: 'flex' }}>
          <Link className={cn('video-link')} to={`/watch?v=${video._id}`}>
            <img
              className={cn('video-img')}
              src={video.imgUrl}
              alt="video img"
            />
          </Link>
          <div className={cn('video-col-end')}>
            <Link className={cn('title-link')} to={`/watch?v=${video._id}`}>
              <div className={cn('video-name')}>{video.title}</div>
            </Link>
            <div className={cn('video-desc')}>{video.desc}</div>
          </div>
        </div>
      </td>
      <td>
        <div className={cn('option-col-box')}>
          <div className={cn('option-icon')}>
            <EditIcon />
          </div>
          <div className={cn('option-icon')}>
            <TrashIcon />
          </div>
        </div>
      </td>
      <td style={{ padding: '12px', textAlign: 'right' }}>
        <Moment format="Do MMM, YYYY">{video.createdAt}</Moment>
      </td>
      {video.status === 'pending' ? (
        <td style={{ textAlign: 'right' }}>Đang chờ duyệt</td>
      ) : (
        <td style={{ textAlign: 'right', color: 'red' }}>Bị từ chối</td>
      )}
    </tr>
  )
}

export default StudioPendingBox
