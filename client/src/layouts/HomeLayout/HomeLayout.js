import classNames from 'classnames/bind'
import styles from './HomeLayout.module.scss'
import { useState } from 'react'
import useViewport from '~/hooks/useViewport'
import Header from '~/components/Header/Header'
import Sidebar from '~/components/SideBars/Sidebar/Sidebar'
import FilterBar from '~/components/FilterBar/FilterBar'

const cn = classNames.bind(styles)

const HomeLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const viewPort = useViewport()
  const useDrawer = viewPort.width <= 1312

  const changeSidebarState = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

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
            <FilterBar />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default HomeLayout
