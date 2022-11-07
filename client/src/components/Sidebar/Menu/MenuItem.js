import classNames from 'classnames/bind'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const cn = classNames.bind(styles)

function MenuItem({ title, to, icon }) {
  return (
    <NavLink
      className={(nav) => cn('menu-item', { active: nav.isActive })}
      to={to}
    >
      <span className={cn('icon')}>{icon}</span>
      <span className={cn('title')}>{title}</span>
    </NavLink>
  )
}

export default MenuItem