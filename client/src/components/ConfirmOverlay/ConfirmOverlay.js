import classNames from 'classnames/bind'
import styles from './ConfirmOverlay.module.scss'

const cn = classNames.bind(styles)

function ConfirmOverlay({ setOpen, title }) {
  return (
    <div className={cn('confirm-overlay')} onClick={() => setOpen(false)}>
      <div className={cn('confirm-wrapper')}>
        <div className={cn('confirm-text')}>{title}</div>
        <div className={cn('confirm-btn')}>
          <button className={cn('close-btn')} onClick={() => setOpen(false)}>
            Hủy
          </button>
          <button
            onClick={() => {
              setOpen(false)
            }}
            className={cn('close-btn', 'accept-btn')}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmOverlay
