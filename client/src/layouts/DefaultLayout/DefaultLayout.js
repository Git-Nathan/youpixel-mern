import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'

import Header from '~/components/Header'
import Sidebar from '~/components/SideBars/Sidebar'
import { useState } from 'react'
import useViewport from '~/hooks/useViewport'

const cn = classNames.bind(styles)

function DefaultLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const viewPort = useViewport()
  const useDrawer = viewPort.width <= 1312

  const changeSidebarState = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  return (
    <div>
      <Header changeSidebarState={changeSidebarState} />
      <div className={cn('container')}>
        <Sidebar isSidebarCollapsed={useDrawer || isSidebarCollapsed} />
        <div
          className={cn('content', {
            collapsed: useDrawer || isSidebarCollapsed,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
