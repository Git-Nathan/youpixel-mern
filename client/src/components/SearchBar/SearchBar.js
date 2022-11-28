import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import { getSearchResult } from '~/api/api'
import { SearchBySoundIcon, SearchIcon } from '../icons'
import SearchResult from '../SearchResult'
import styles from './SearchBar.module.scss'

const cn = classNames.bind(styles)

function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [debouncedValue] = useDebounce(searchValue, 100)
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
      if (searchValue.length > 0) {
        navigate({
          pathname: '/results',
          search: `?${createSearchParams({
            search_query: searchValue,
          })}`,
        })
      }
    }
  }

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }

    if (debouncedValue.length > 0) {
      const getData = async () => {
        const result = await getSearchResult(debouncedValue)
        setSearchResult(result.data)
      }
      getData()
    }
  }, [debouncedValue])

  return (
    <div className={cn('search-wrapper')}>
      <form className={cn('search-box')}>
        <div className={cn('search-box-icon')}>
          <SearchIcon height="22" />
        </div>

        <input
          className={cn('search-input')}
          type="text"
          placeholder="Tìm kiếm"
          spellCheck={false}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />

        <div className={cn('searchbysound-icon')}>
          <SearchBySoundIcon height="22" />
        </div>
        {searchResult.length > 0 && (
          <div className={cn('search-result')}>
            {searchResult.map((item) => (
              <SearchResult
                key={item._id}
                content={item.content}
                setSearchValue={setSearchValue}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar
