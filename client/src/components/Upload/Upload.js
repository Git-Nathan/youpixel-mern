import styles from './Upload.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const cn = classNames.bind(styles)

function Upload({ setOpen }) {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('form')}>
        <div className={cn('start')}>
          <div className={cn('form-title')}>Đăng tải video</div>
          <div className={cn('close-icon')} onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className={cn('center')}>
          <h2 className={cn('detail-title')}>Chi tiết</h2>
          <div className={cn('input-field')}>
            <div className={cn('left-form')}>
              <div className={cn('title-box')}>
                <div className={cn('title-text')}>Tiêu đề (bắt buộc)</div>
                <textarea
                  className={cn('text-input')}
                  placeholder="Thêm tiêu đề để mô tả video của bạn"
                />
              </div>
              <div className={cn('desc-box')}>
                <div className={cn('title-text')}>Mô tả</div>
                <textarea
                  className={cn('text-input')}
                  rows="6"
                  placeholder="Giới thiệu về video của bạn cho người xem"
                />
              </div>
              <div className={cn('header-2')}>Hình thu nhỏ</div>
              <div className={cn('header-2-detail')}>
                Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video
                của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và
                thu hút người xem.
              </div>
            </div>
            <div className={cn('right-form')}>video</div>
          </div>
        </div>
        <div className={cn('end')}>
          <button className={cn('save-btn')}>Lưu</button>
        </div>
      </div>
    </div>
  )
}

export default Upload
