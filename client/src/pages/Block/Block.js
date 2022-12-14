import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './Block.module.scss'

const cn = classNames.bind(styles)

function Block() {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('message-window')}>
        <h2 className={cn('message-title')}>Tài khoản của bạn đã bị cấm!</h2>
        <div className={cn('message-lable')}>Lời nhắn: </div>
        <div className={cn('message')}>
          Tài khoản của bạn đã bị cấm vì vi phạm... Có vấn đề gì xin vui lòng
          liên hệ với admin của trang web. Xin cảm ơn!
        </div>
        <div className={cn('btn-wrap')}>
          <Button children="Trở về trang chủ" small primary />
        </div>
      </div>
    </div>
  )
}

export default Block
