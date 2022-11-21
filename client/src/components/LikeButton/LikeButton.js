import { LikeIcon } from '../icons'
import classNames from 'classnames/bind'
import styles from './LikeButton.module.scss'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { signin } from '~/actions/authActions'
import { useDispatch } from 'react-redux'

const cn = classNames.bind(styles)

function LikeButton({ video, currentUser, handleLike, handleDislike }) {
  const dispatch = useDispatch()

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          },
        )
        dispatch(
          signin({
            name: res.data.name,
            email: res.data.email,
            picture: res.data.picture,
          }),
        )
      } catch (err) {
        console.log(err)
      }
    },
  })

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
          <button className={cn('like-btn')} onClick={login}>
            <LikeIcon pathFill={'white'} />
            {video.likes.length > 0 && (
              <span className={cn('like-btn-text')}>{video.likes.length}</span>
            )}
          </button>
          <button className={cn('dislike-btn')} onClick={login}>
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
