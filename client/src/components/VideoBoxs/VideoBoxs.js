import { CircularProgress } from '@mui/material'
import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import VideoBox from './VideoBox/VideoBox'
import styles from './VideoBoxs.module.scss'

const cn = classNames.bind(styles)

function VideoBoxs() {
  const { videos, isLoading } = useSelector((store) => store.videoReducer)

  if (!videos.length && !isLoading) return 'No videos'

  return (
    <div className={cn('grid__row', 'videoboxs-row')}>
      {false ? (
        <CircularProgress />
      ) : (
        videos?.map((video) => <VideoBox key={video._id} video={video} />)
      )}
    </div>
  )
}

export default VideoBoxs
