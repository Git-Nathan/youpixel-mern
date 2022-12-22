import styles from './ReportedCommentBox.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const cn = classNames.bind(styles)

function ReportedCommentBox() {
  const [video, setVideo] = useState([])

  let videoDuration
  if (video?.duration) {
    if (video.duration < 3600) {
      videoDuration = new Date(video.duration * 1000)
        .toISOString()
        .slice(14, 19)
    } else {
      videoDuration = new Date(video.duration * 1000)
        .toISOString()
        .slice(11, 19)
    }
  }

  return (
    <tr className={cn('row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <div style={{ display: 'flex' }}>
          <Link className={cn('video-link')} to={`/watch?v=${video._id}`}>
            <img
              className={cn('video-img')}
              src={video.imgUrl}
              alt="video img"
            />
            <div className={cn('video-duration')}>{videoDuration}</div>
          </Link>
          <div className={cn('video-col-end')}>
            <Link className={cn('title-link')} to={`/watch?v=${video._id}`}>
              <div className={cn('video-name')}>{video.title}</div>
            </Link>
            <div className={cn('video-desc')}>{video.desc}</div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default ReportedCommentBox
