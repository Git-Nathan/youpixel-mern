import styles from './StudioVideo.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

function StudioVideo() {
  return (
    <div className={cn('wrapper')}>
      <h2 style={{ marginLeft: '8px' }}>Nội dung của kênh</h2>
    </div>
  )
}

export default StudioVideo
