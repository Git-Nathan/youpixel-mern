import styles from './StudioPending.module.scss'
import classNames from 'classnames/bind'
import StudioPendingBox from '~/components/StudioPendingBox'

const cn = classNames.bind(styles)

function StudioPending() {
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
        <StudioPendingBox />
        <StudioPendingBox />
        <StudioPendingBox />
        <StudioPendingBox />
        <StudioPendingBox />
      </table>
    </div>
  )
}

export default StudioPending
