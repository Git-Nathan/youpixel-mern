import styles from './TopViews.module.scss'
import classNames from 'classnames/bind'
import SearchVideoBox from '~/components/SearchVideoBox'
import { useEffect } from 'react'

const cn = classNames.bind(styles)

function TopViews() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  })

  return (
    <>
      <div className={cn('wrapper-title')}>
        <img
          className={cn('title-img')}
          src="https://www.youtube.com/img/trending/avatar/trending_avatar.png"
          alt="title img"
        />
        <h2 className={cn('channel-name')}>Top lượt xem</h2>
      </div>
      <div className={cn('separate')}></div>
      <div className={cn('wrapper-videos')}>
        <SearchVideoBox />
        <SearchVideoBox />
        <SearchVideoBox />
        <SearchVideoBox />
        <SearchVideoBox />
        <SearchVideoBox />
      </div>
    </>
  )
}

export default TopViews
