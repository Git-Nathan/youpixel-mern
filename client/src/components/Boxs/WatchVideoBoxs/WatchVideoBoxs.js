import classNames from 'classnames/bind'
import styles from './WatchVideoBoxs.module.scss'
import WatchVideoBox from './WatchVideoBox'
import Loading from '~/components/Loading'

const cn = classNames.bind(styles)

function WatchVideoBoxs({
  pageLoading,
  currentVideos,
  loading,
  scrollThreshold,
}) {
  if (pageLoading) {
    return <Loading />
  }

  return (
    <>
      <div className={cn('wrapper')}>
        {currentVideos?.map((video) => (
          <WatchVideoBox key={video._id} video={video} />
        ))}
      </div>
      {loading && <Loading mgt="0px" size="3em" />}
      {scrollThreshold && (
        <div className={cn('scrollThreshold')} ref={scrollThreshold}></div>
      )}
    </>
  )
}

export default WatchVideoBoxs
