import styles from './StudioPendingBox.module.scss'
import classNames from 'classnames/bind'
import { HomeIcon } from '../icons'

const cn = classNames.bind(styles)

function StudioPendingBox({ video }) {
  return (
    <tr className={cn('video-row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <img className={cn('video-img')} src={video.imgUrl} alt="video img" />
        <div className={cn('video-col-end')}>
          <div className={cn('video-name')}>{video.title}</div>
          <div className={cn('video-desc')}>{video.desc}</div>
        </div>
      </td>
      <td>
        <div className={cn('option-col-box')}>
          <div className={cn('option-icon')}>
            <HomeIcon fill={'white'} />
          </div>
          <div className={cn('option-icon')}>
            <HomeIcon fill={'white'} />
          </div>
          <div className={cn('option-icon')}>
            <HomeIcon fill={'white'} />
          </div>
        </div>
      </td>
      <td style={{ padding: '12px', textAlign: 'right' }}>7 th 12, 2022</td>
      <td style={{ textAlign: 'right' }}>Đang chờ duyệt</td>
    </tr>
  )
}

export default StudioPendingBox
