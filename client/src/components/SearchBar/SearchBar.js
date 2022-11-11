import classNames from 'classnames/bind'
import { SearchBySoundIcon, SearchIcon } from '../icons'
import styles from './SearchBar.module.scss'

const cn = classNames.bind(styles)

function SearchBar() {
  return (
    <>
      <form className={cn('search-box')}>
        <div className={cn('search-box-icon')}>
          <SearchIcon height="22" />
        </div>

        <input
          className={cn('search-input')}
          type="text"
          placeholder="Tìm kiếm"
          spellCheck={false}
        />

        <div className={cn('searchbysound-icon')}>
          <SearchBySoundIcon height="22" />
        </div>
      </form>
    </>
  )
}

export default SearchBar
