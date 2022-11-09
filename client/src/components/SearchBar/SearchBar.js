import classNames from 'classnames/bind'
import { SearchBySoundIcon, SearchIcon } from '../icons'
import styles from './SearchBar.module.scss'

const cn = classNames.bind(styles)

function SearchBar() {
  return (
    <>
      <form className={cn('search-box')}>
        <SearchIcon className={cn('search-box-icon')} width="26" height="26" />

        <input
          className={cn('search-input')}
          type="text"
          placeholder="Tìm kiếm"
          spellCheck={false}
        />

        <SearchBySoundIcon className={cn('searchbysound-icon')} />
      </form>
    </>
  )
}

export default SearchBar
