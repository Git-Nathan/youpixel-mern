import classNames from 'classnames/bind'
import styles from './StudioLayout.module.scss'

import Header from '~/components/Header'
import StudioSidebar from '~/components/StudioSidebar'

const cn = classNames.bind(styles)

function StudioLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cn('container')}>
        <StudioSidebar />
        <div className={cn('content')}>{children}</div>
      </div>
    </div>
  )
}

export default StudioLayout
