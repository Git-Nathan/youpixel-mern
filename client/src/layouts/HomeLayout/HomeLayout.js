import classNames from 'classnames/bind'
import styles from './HomeLayout.module.scss'
import { useEffect, useState } from 'react'
import useViewport from '~/hooks/useViewport'
import Header from '~/components/Header/Header'
import Sidebar from '~/components/SideBars/Sidebar/Sidebar'
import FilterBar from '~/components/FilterBar/FilterBar'
import { getAllSearch } from '~/api/api'

const cn = classNames.bind(styles)

const HomeLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [filterItems, setFilterItems] = useState([])
  const viewPort = useViewport()
  const useDrawer = viewPort.width <= 1312

  const changeSidebarState = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  useEffect(() => {
    const getItems = async () => {
      const { data } = await getAllSearch()
      setFilterItems(data.result)
    }
    getItems()
  }, [])

  return (
    <>
      <Header changeSidebarState={changeSidebarState} />
      <div className={cn('container')}>
        <Sidebar isSidebarCollapsed={useDrawer || isSidebarCollapsed} />
        <div
          className={cn('content', {
            collapsed: useDrawer || isSidebarCollapsed,
          })}
        >
          <div
            className={cn('filter-bar', {
              collapsed: useDrawer || isSidebarCollapsed,
            })}
          >
            <FilterBar filterItems={filterItems} />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default HomeLayout
