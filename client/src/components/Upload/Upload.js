import styles from './Upload.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const cn = classNames.bind(styles)

function Upload() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('form')}>
        <div className={cn('start')}>
          <div className={cn('form-title')}>Đăng tải video</div>
          <div className={cn('close-icon')}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
