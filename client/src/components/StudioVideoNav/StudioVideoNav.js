import styles from './StudioVideoNav.module.scss'
import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'

const cn = classNames.bind(styles)

function StudioVideoNav() {
  return (
    <div className={cn('wrapper')}>
      <h2 className={cn('title')} style={{ marginLeft: '8px' }}>
        Nội dung của kênh
      </h2>
      <div className={cn('nav-box')}>
        <NavLink
          to={'/studio/videos/upload'}
          className={(nav) => cn('menu-item', { active: nav.isActive })}
          end
        >
          <div className={cn('nav-link-btn')}>Video của bạn</div>
        </NavLink>
        <NavLink
          to={'/studio/videos/pending'}
          className={(nav) => cn('menu-item', { active: nav.isActive })}
          end
        >
          <div className={cn('nav-link-btn')}>Video chờ duyệt</div>
        </NavLink>
      </div>
    </div>
  )
}

export default StudioVideoNav
