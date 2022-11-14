import styles from './StudioVideos.module.scss'
import classNames from 'classnames/bind'
import StudioVideoBox from '~/components/StudioVideoBox'

const cn = classNames.bind(styles)

function StudioVideos() {
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
        <StudioVideoBox />
        <StudioVideoBox />
        <StudioVideoBox />
        <StudioVideoBox />
        <StudioVideoBox />
      </table>
    </div>
  )
}

export default StudioVideos
