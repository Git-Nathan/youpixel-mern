import { CircularProgress } from '@mui/material'
import styles from './Loading.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

function Loading() {
  return (
    <div className={cn('loadingPaper')}>
      <CircularProgress className={cn('circularProgress')} size="5em" />
    </div>
  )
}

export default Loading
