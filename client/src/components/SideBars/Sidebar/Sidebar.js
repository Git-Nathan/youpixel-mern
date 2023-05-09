import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'
import { MenuItem } from './Menu'
import {
  HomeIcon,
  HomeIconActive,
  LikeIcon,
  MyVideosIcon,
  TopViewsIcon,
  TopViewsIconActive,
  WatchedIcon,
  WatchedIconActive,
} from '../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { signin } from '~/actions/authActions'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'

const cn = classNames.bind(styles)

function Sidebar({ isSidebarCollapsed }) {
  const { reload } = useSelector((store) => store.authReducer)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('profile')),
  )

  const dispatch = useDispatch()

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

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('profile')))
  }, [reload])

  return (
    <aside className={cn('wrapper', { collapsed: isSidebarCollapsed })}>
      <nav className={cn('nav-wrap', { collapsed: isSidebarCollapsed })}>
        <div
          className={cn('nav-box')}
          style={{ borderTop: 'none', marginTop: '0' }}
        >
          <MenuItem
            to={'/'}
            title="Trang chủ"
            icon={<HomeIcon />}
            activeIcon={<HomeIconActive />}
            isSidebarCollapsed={isSidebarCollapsed}
          ></MenuItem>
        </div>
        <div className={cn('nav-box')}>
          {currentUser?.result ? (
            <>
              <MenuItem
                to={'/feed/history'}
                title="Video đã xem"
                icon={<WatchedIcon />}
                activeIcon={<WatchedIconActive />}
                isSidebarCollapsed={isSidebarCollapsed}
              ></MenuItem>
              <MenuItem
                to={'/studio/videos/upload'}
                title="Video của bạn"
                icon={<MyVideosIcon />}
                isSidebarCollapsed={isSidebarCollapsed}
              ></MenuItem>
              <MenuItem
                to={'/liked'}
                title="Video đã thích"
                icon={<LikeIcon pathFill="white" />}
                activeIcon={<LikeIcon pathFill="var(--primary-color)" />}
                isSidebarCollapsed={isSidebarCollapsed}
              ></MenuItem>
            </>
          ) : (
            <>
              <button className={cn('menu-item')} onClick={handleLogin}>
                <div className={cn('wrap')}>
                  <span className={cn('icon')}>
                    <WatchedIcon />
                  </span>
                  <span
                    className={cn('title', { collapsed: isSidebarCollapsed })}
                  >
                    Video đã xem
                  </span>
                </div>
              </button>
              <button className={cn('menu-item')} onClick={handleLogin}>
                <div className={cn('wrap')}>
                  <span className={cn('icon')}>
                    <MyVideosIcon />
                  </span>
                  <span
                    className={cn('title', { collapsed: isSidebarCollapsed })}
                  >
                    Video của bạn
                  </span>
                </div>
              </button>
              <button className={cn('menu-item')} onClick={handleLogin}>
                <div className={cn('wrap')}>
                  <span className={cn('icon')}>
                    <LikeIcon pathFill="white" />
                  </span>
                  <span
                    className={cn('title', { collapsed: isSidebarCollapsed })}
                  >
                    Video đã thích
                  </span>
                </div>
              </button>
            </>
          )}
        </div>
        {currentUser ? (
          <div
            className={cn(
              'nav-box',
              currentUser.subscribedUsers.length === 0 && {
                collapsed: isSidebarCollapsed,
              },
            )}
          >
            <h3
              className={cn('nav-box-title', { collapsed: isSidebarCollapsed })}
            >
              Kênh đăng ký
            </h3>
            {currentUser.subscribedUsers
              .slice(0)
              .reverse()
              .map((item) => (
                <MenuItem
                  key={item._id}
                  to={`/channel/${item._id}`}
                  title={item.name}
                  icon={
                    <div
                      referrerPolicy="no-referrer"
                      className={cn('author-img')}
                      style={{ backgroundImage: `url('${item.picture}')` }}
                    ></div>
                  }
                  activeIcon={
                    <div
                      referrerPolicy="no-referrer"
                      className={cn('author-img')}
                      style={{ backgroundImage: `url('${item.picture}')` }}
                    ></div>
                  }
                  isSidebarCollapsed={isSidebarCollapsed}
                ></MenuItem>
              ))}

            {currentUser.subscribedUsers.length === 0 && (
              <div
                className={cn('guide-signin', {
                  collapsed: isSidebarCollapsed,
                })}
              >
                Những kênh bạn đăng ký sẽ được hiển thị ở đây.
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={cn('nav-box', { collapsed: isSidebarCollapsed })}>
              <div
                className={cn('guide-signin', {
                  collapsed: isSidebarCollapsed,
                })}
              >
                Hãy đăng nhập để thích video, bình luận và đăng ký kênh.
              </div>
              <Button
                className={cn('signin-btn', { collapsed: isSidebarCollapsed })}
                children="Đăng nhập"
                small
                normal
                onClick={handleLogin}
              />
            </div>
          </>
        )}

        <div className={cn('nav-box')}>
          <h3
            className={cn('nav-box-title', { collapsed: isSidebarCollapsed })}
          >
            Khám phá
          </h3>
          <MenuItem
            to={'/topviews'}
            title="Xu hướng"
            icon={<TopViewsIcon />}
            activeIcon={<TopViewsIconActive />}
            isSidebarCollapsed={isSidebarCollapsed}
          ></MenuItem>
        </div>
        <div className={cn('footer', { collapsed: isSidebarCollapsed })}>
          <div className={cn('footer-box')}>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Giới thiệu
            </div>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Điều khoản
            </div>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Quyền riêng tư
            </div>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Chích sách và an toàn
            </div>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Cách YouPixels hoạt động
            </div>
            <div
              className={cn('footer-link', { collapsed: isSidebarCollapsed })}
            >
              Thử các tính năng mới
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
