import styles from './Watch.module.scss'
import classNames from 'classnames/bind'
import { Link, useSearchParams } from 'react-router-dom'
import WatchVideoBoxs from '~/components/WatchVideoBoxs/WatchVideoBoxs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo } from '~/actions/videoActions'
import { CircularProgress, Paper } from '@mui/material'
import { fetchChannel } from '~/api/api'
import { LikeIcon, ShareIcon } from '~/components/icons'

const cn = classNames.bind(styles)

function Watch() {
  const { video, isLoading } = useSelector((store) => store.videoReducer)
  const [channel, setChannel] = useState({})
  const [searchParams] = useSearchParams({})
  const currentUser = JSON.parse(localStorage.getItem('profile'))

  const dispatch = useDispatch()

  const videoId = searchParams.get('v')

  useEffect(() => {
    const getChannel = async () => {
      const { data } = await fetchChannel(video?.userId)
      setChannel(data)
    }
    getChannel()
  }, [video?.userId])

  useEffect(() => {
    dispatch(getVideo(videoId))
  }, [dispatch, videoId])

  if (isLoading) {
    return (
      <Paper
        style={{ backgroundColor: '#15141b' }}
        elevation={6}
        className={cn('loadingPaper')}
      >
        <CircularProgress className={cn('circularProgress')} size="5em" />
      </Paper>
    )
  }

  return (
    <div className={cn('wrapper')}>
      <div className={cn('primary')}>
        <video
          className={cn('video-player')}
          src={video.videoUrl}
          controls
          autoPlay
        ></video>
        <div className={cn('video-info-wrapper')}>
          <h2 className={cn('video-name')}>{video.title}</h2>
          <div className={cn('video-options-wrapper')}>
            <div className={cn('channel-wrapper')}>
              <Link>
                <img
                  className={cn('channel-picture')}
                  src={channel.picture}
                  alt="ChannelPicture"
                />
              </Link>
              <div className={cn('channel-text')}>
                <Link className={cn('channel-name')}>{channel.name}</Link>
                <div className={cn('channel-sub')}>Số người đăng ký</div>
              </div>
              <button className={cn('sub-btn')}>Đăng ký</button>
            </div>
            <div className={cn('options-wrapper')}>
              <button className={cn('like-btn')}>
                <LikeIcon />
                <span className={cn('like-btn-text')}>12 tr</span>
              </button>
              <button className={cn('dislike-btn')}>
                <LikeIcon />
                <span className={cn('like-btn-text')}>8 tr</span>
              </button>
              <button className={cn('share-btn')}>
                <ShareIcon />
                <span className={cn('like-btn-text')}>Chia sẻ</span>
              </button>
            </div>
          </div>
          <div className={cn('video-desc-wrapper')}>
            <div className={cn('video-views-and-time')}>
              <span>77N lượt xem</span>
              <div style={{ width: '12px' }}></div>
              <span>3 năm trước</span>
            </div>
            <div className={cn('video-desc')}>{video.desc}</div>
          </div>
          <div className={cn('comment-header')}>
            <span className={cn('numof-comment')}>32 bình luận</span>
          </div>
          <div className={cn('comment-box')}>
            <img
              referrerpolicy="no-referrer"
              className={cn('user-img')}
              src={currentUser?.result.picture}
              alt="UserImg"
            />
            <div className={cn('comment-imput-wrapper')}>
              <textarea
                className={cn('comment-imput')}
                placeholder="Viết bình luận..."
                rows="1"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className={cn('secondary')}>
        <div className={cn('filter-bar')}>
          <div className={cn('filter-bar-box')}>
            <Link className={cn('filter-bar-link')}>Tất cả</Link>
            <Link className={cn('filter-bar-link')}>Danh sách kết hợp</Link>
            <Link className={cn('filter-bar-link')}>Trực tiếp</Link>
            <Link className={cn('filter-bar-link')}>Âm nhạc</Link>
            <Link className={cn('filter-bar-link')}>Mới tải lên gần đây</Link>
            <Link className={cn('filter-bar-link')}>Đã xem</Link>
            <Link className={cn('filter-bar-link')}>Đề xuất mới</Link>
          </div>
        </div>
        <WatchVideoBoxs />
      </div>
    </div>
  )
}

export default Watch
