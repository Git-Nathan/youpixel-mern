import { Link } from 'react-router-dom'
import styles from './FilterBar.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

function FilterBar({ filterItems }) {
  return (
    <div className={cn('filter-bar-box')}>
      {filterItems.map((item) => {
        return (
          <Link
            key={item._id}
            className={cn('filter-bar-link')}
            to={`/results?search_query=${item.content}`}
          >
            {item.content}
          </Link>
        )
      })}
    </div>
  )
}

export default FilterBar
