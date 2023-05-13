import styles from './Watch.module.scss'
import classNames from 'classnames/bind'
import { Link, useSearchParams } from 'react-router-dom'
import WatchVideoBoxs from '~/components/Boxs/WatchVideoBoxs/WatchVideoBoxs'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addView, getVideo } from '~/actions/videoActions'
import {
  addWatchedVideo,
  fetchChannel,
  fetchVideos,
  getAllSearch,
} from '~/api/api'
import { ShareIcon } from '~/components/icons'
import Moment from 'react-moment'
import { signin } from '~/actions/authActions'
import SubcribeButton from '~/components/Button/SubcribeButton'
import LikeButton from '~/components/Button/LikeButton'
import Comments from '~/components/Comments'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Loading from '~/components/Loading'
import FilterBar from '~/components/FilterBar'
import { toast } from 'react-toastify'
import useViewport from '~/hooks/useViewport'
import Button from '~/components/Button/Button'

const cn = classNames.bind(styles)

function Watch() {
  const { video, isLoading } = useSelector((store) => store.videoReducer)
  const [channel, setChannel] = useState({})
  const [searchParams] = useSearchParams({})
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('profile')),
  )
  const viewPort = useViewport()
  const full = viewPort.width <= 1016

  const dispatch = useDispatch()

  const videoId = searchParams.get('v')

  const [currentVideos, setCurrentVideos] = useState([])
  const [videos, setVideos] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [startIndex, setStartIndex] = useState(20)

  const [filterItems, setFilterItems] = useState([])

  const getMoreVideos = useCallback(() => {
    setCurrentVideos((prev) =>
      prev.concat(videos.slice(0 + startIndex, 20 + startIndex)),
    )
    setStartIndex((prev) => prev + 20)
    if (videos.length >= currentVideos.length) {
      setHasMore(false)
    }
    setLoading(false)
  }, [currentVideos.length, startIndex, videos])

  const intObserver = useRef()

  const scrollThreshold = useCallback(
    (threshold) => {
      if (loading) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((items) => {
        if (items[0].isIntersecting && hasMore) {
          setLoading(true)
          getMoreVideos()
        }
      })

      if (threshold) intObserver.current.observe(threshold)
    },
    [getMoreVideos, hasMore, loading],
  )

  const handleLogin = useGoogleLogin({
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

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success('Đã sao chép đường liên kết vào bảng nhớ tạm.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    if (video?.userId) {
      const getChannel = async () => {
        const { data } = await fetchChannel(video?.userId)
        setChannel(data[0])
      }
      getChannel()
    }
  }, [video?.userId])

  useEffect(() => {
    if (video._id) {
      const addWatched = setTimeout(async () => {
        await addWatchedVideo(video._id)
      }, 1000)
      const addVideoView = setTimeout(() => {
        dispatch(addView(video._id))
      }, 30000)
      return () => {
        clearTimeout(addVideoView)
        clearTimeout(addWatched)
      }
    }
  }, [dispatch, video._id])

  useEffect(() => {
    dispatch(getVideo(videoId))
  }, [dispatch, videoId])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getdata = async () => {
      const { data } = await fetchVideos()
      setVideos(data.data)
      setCurrentVideos((prev) => prev.concat(data.data.slice(0, 20)))
      setPageLoading(false)
      if (data.data.length < 20) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    }
    getdata()
  }, [])

  useEffect(() => {
    const getItems = async () => {
      const { data } = await getAllSearch()
      setFilterItems(data.result)
    }
    getItems()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={cn('wrapper')}>
      <div className={cn('primary', { full: full })}>
        <div className={cn('video-player-wrapper')}>
          <video
            className={cn('video-player')}
            src={video.videoUrl}
            controls
            autoPlay
          ></video>
        </div>
        <div className={cn('video-info-wrapper')}>
          <h2 className={cn('video-name')}>{video.title}</h2>
          <div className={cn('video-options-wrapper')}>
            <div className={cn('channel-wrapper')}>
              {channel?.picture ? (
                <Link to={`/channel/${channel._id}`}>
                  <img
                    referrerPolicy="no-referrer"
                    className={cn('channel-picture')}
                    src={channel.picture}
                    alt="ChannelPicture"
                  />
                </Link>
              ) : (
                <div className={cn('channel-picture')}></div>
              )}

              <div className={cn('channel-text')}>
                <Link
                  to={`/channel/${channel._id}`}
                  className={cn('channel-name')}
                >
                  {channel.name}
                </Link>
                <div className={cn('channel-sub')}>
                  {channel.subscribers} người đăng ký
                </div>
              </div>
              <SubcribeButton
                currentUser={currentUser}
                channel={channel}
                setCurrentUser={setCurrentUser}
                setChannel={setChannel}
              />
            </div>
            <div className={cn('options-wrapper')}>
              <LikeButton
                video={video}
                currentUser={currentUser}
                handleLogin={handleLogin}
              />
              <button className={cn('share-btn')} onClick={handleShare}>
                <ShareIcon />
                <span className={cn('like-btn-text')}>Chia sẻ</span>
              </button>
            </div>
          </div>
          <div className={cn('video-desc-wrapper')}>
            <div className={cn('video-views-and-time')}>
              <span>{video.views} lượt xem</span>
              <div style={{ width: '12px' }}></div>
              <span>
                <Moment fromNow>{video.createdAt}</Moment>
              </span>
            </div>
            <div className={cn('video-desc')}>{video.desc}</div>
          </div>

          {full && (
            <div className={cn('recommend')}>
              <div className={cn('filter-bar')}>
                <FilterBar filterItems={filterItems} />
              </div>
              <WatchVideoBoxs
                pageLoading={pageLoading}
                currentVideos={currentVideos}
                loading={loading}
              />
              {hasMore && (
                <Button
                  className={cn('getmore-btn')}
                  small
                  normal
                  children={'Xem thêm'}
                  onClick={getMoreVideos}
                />
              )}
            </div>
          )}

          <Comments
            videoId={video?._id}
            currentUser={currentUser}
            handleLogin={handleLogin}
          />
        </div>
      </div>
      {!full && (
        <div className={cn('secondary')}>
          <div className={cn('filter-bar')}>
            <FilterBar filterItems={filterItems} />
          </div>
          <WatchVideoBoxs
            pageLoading={pageLoading}
            currentVideos={currentVideos}
            loading={loading}
            scrollThreshold={scrollThreshold}
          />
        </div>
      )}
    </div>
  )
}

export default Watch
