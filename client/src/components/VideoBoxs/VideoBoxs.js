import classNames from 'classnames/bind'
import VideoBox from './VideoBox/VideoBox'
import styles from './VideoBoxs.module.scss'

const cn = classNames.bind(styles)

function VideoBoxs() {
  return (
    <div className={cn('grid__row', 'videoboxs-row')}>
      <VideoBox />
      <VideoBox />
      <VideoBox />
      <VideoBox />
      <VideoBox />
      <VideoBox />
      <VideoBox />
    </div>
  )
}

export default VideoBoxs
