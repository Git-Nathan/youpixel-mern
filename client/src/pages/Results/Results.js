import styles from './Results.module.scss'
import classNames from 'classnames/bind'
import SearchVideoBox from '~/components/Boxs/SearchVideoBox'
import { useState } from 'react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addSearchResult, getVideosBySearch } from '~/api/api'
import Loading from '~/components/Loading'

const cn = classNames.bind(styles)

function Results() {
  const [videos, setVideos] = useState([])
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search_query')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const result = await getVideosBySearch(
        createSearchParams({ search_query: searchQuery }),
      )
      setVideos(result.data)
    }
    getData()
    setIsLoading(false)
    addSearchResult(searchQuery)
  }, [searchQuery])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className={cn('wrapper-videos')}>
        {videos.length > 0 && !isLoading ? (
          <>
            {videos.map((video) => (
              <SearchVideoBox key={video._id} video={video} />
            ))}
          </>
        ) : (
          <h3 className={cn('novideos')}>Không có video nào!</h3>
        )}
      </div>
    </>
  )
}

export default Results
