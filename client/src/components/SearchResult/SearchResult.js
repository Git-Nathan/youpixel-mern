import { SearchIcon } from '../icons'
import classNames from 'classnames/bind'
import styles from './SearchResult.module.scss'
import { Link } from 'react-router-dom'

const cn = classNames.bind(styles)

function SearchResult({ content, setSearchValue }) {
  const set = () => {
    setSearchValue(content)
  }

  return (
    <Link
      to={`/results?search_query=${content}`}
      className={cn('search-item')}
      onClick={set}
    >
      <SearchIcon />
      <div>{content}</div>
    </Link>
  )
}

export default SearchResult
