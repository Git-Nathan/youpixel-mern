import { LikeIcon } from '../../icons'
import classNames from 'classnames/bind'
import styles from './LikeButton.module.scss'

const cn = classNames.bind(styles)

function LikeButton({
  video,
  currentUser,
  handleLike,
  handleDislike,
  handleLogin,
}) {
  return (
    <>
      {currentUser ? (
        <>
          <button className={cn('like-btn')} onClick={handleLike}>
            {video.likes?.includes(currentUser.result._id) ? (
              <>
                <LikeIcon pathFill={'#f05123'} />
                {video.likes.length > 0 && (
                  <span
                    className={cn('like-btn-text')}
                    style={{ color: 'var(--primary-color)' }}
                  >
                    {video.likes.length}
                  </span>
                )}
              </>
            ) : (
              <>
                <LikeIcon pathFill={'white'} />
                {video.likes.length > 0 && (
                  <span className={cn('like-btn-text')}>
                    {video.likes.length}
                  </span>
                )}
              </>
            )}
          </button>
          <button className={cn('dislike-btn')} onClick={handleDislike}>
            {video.dislikes?.includes(currentUser.result._id) ? (
              <>
                <LikeIcon pathFill={'#f05123'} />
                {video.dislikes.length > 0 && (
                  <span
                    className={cn('like-btn-text')}
                    style={{ color: 'var(--primary-color)' }}
                  >
                    {video.dislikes.length}
                  </span>
                )}
              </>
            ) : (
              <>
                <LikeIcon pathFill={'white'} />
                {video.dislikes.length > 0 && (
                  <span className={cn('like-btn-text')}>
                    {video.dislikes.length}
                  </span>
                )}
              </>
            )}
          </button>
        </>
      ) : (
        <>
          <button className={cn('like-btn')} onClick={handleLogin}>
            <LikeIcon pathFill={'white'} />
            {video.likes.length > 0 && (
              <span className={cn('like-btn-text')}>{video.likes.length}</span>
            )}
          </button>
          <button className={cn('dislike-btn')} onClick={handleLogin}>
            <LikeIcon pathFill={'white'} />
            {video.dislikes.length > 0 && (
              <span className={cn('like-btn-text')}>
                {video.dislikes.length}
              </span>
            )}
          </button>
        </>
      )}
    </>
  )
}

export default LikeButton
