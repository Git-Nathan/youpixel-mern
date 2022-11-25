import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { sub, unsub } from '~/actions/authActions'
import { fetchChannel, getUserVideos } from '~/api/api'
import SubcribeButton from '~/components/SubcribeButton'
import VideoBox from '~/components/VideoBoxs/VideoBox'
import styles from './Channel.module.scss'

const cn = classNames.bind(styles)

function Channel() {
  const { id } = useParams()
  const [channel, setChannel] = useState({})
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('profile')),
  )
  const dispatch = useDispatch()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const getChannel = async () => {
      const { data } = await fetchChannel(id)
      setChannel(data)
    }
    getChannel()
  }, [id])

  useEffect(() => {
    const getdata = async () => {
      const { data } = await getUserVideos(id)
      setVideos(data.videos)
    }
    getdata()
  }, [id])

  const handleSub = async () => {
    if (currentUser?.result.subscribedUsers.includes(channel._id)) {
      let archive = structuredClone(currentUser)
      archive.result.subscribedUsers.splice(
        archive.result.subscribedUsers.findIndex(
          (item) => item === channel._id,
        ),
      )
      setCurrentUser(archive)
      setChannel({ ...channel, subscribers: channel.subscribers - 1 })
      dispatch(unsub(channel._id, setCurrentUser))
    } else {
      setCurrentUser({
        ...currentUser,
        result: { ...currentUser.result, subscribedUsers: channel._id },
      })
      setChannel({ ...channel, subscribers: channel.subscribers + 1 })
      dispatch(sub(channel._id, setCurrentUser))
    }
  }

  return (
    <>
      <div className={cn('wrapper-title')}>
        <div className={cn('title-left')}>
          <img
            className={cn('title-img')}
            src={channel.picture}
            alt="title img"
          />
          <div className={cn('channel-detail')}>
            <h2 className={cn('channel-name')}>{channel.name}</h2>
            <div className={cn('channel-sub')}>
              {channel.subscribers} người đăng ký
            </div>
          </div>
        </div>
        <div className={cn('title-right')}>
          <SubcribeButton
            currentUser={currentUser}
            channel={channel}
            handleSub={handleSub}
          />
        </div>
      </div>
      <div className={cn('separate')}></div>
      <div className={cn('wrapper-videos')}>
        <div className={cn('grid__row', 'videoboxs-row')}>
          {videos?.map((video) => (
            <VideoBox key={video._id} video={video} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Channel
