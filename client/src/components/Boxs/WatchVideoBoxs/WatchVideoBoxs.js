import classNames from 'classnames/bind'
import styles from './WatchVideoBoxs.module.scss'
import WatchVideoBox from './WatchVideoBox'

const cn = classNames.bind(styles)

function WatchVideoBoxs() {
  return (
    <div className={cn('wrapper')}>
      <WatchVideoBox />
      <WatchVideoBox />
      <WatchVideoBox />
      <WatchVideoBox />
      <WatchVideoBox />
      <WatchVideoBox />
    </div>
  )
}

export default WatchVideoBoxs
