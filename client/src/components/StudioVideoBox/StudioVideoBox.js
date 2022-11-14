import styles from './StudioVideoBox.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

function StudioVideoBox() {
  return (
    <tr className={cn('video-row')}>
      <td className={cn('video-col')} style={{ padding: '0 0 0 12px' }}>
        <img
          className={cn('video-img')}
          src="https://i9.ytimg.com/vi/zfUhTwZaWkA/mqdefault.jpg?sqp=CLybwpsG-oaymwEmCMACELQB8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgWShDMA8=&rs=AOn4CLCp7qfiDBrc0SyoNis0FIAKD9CrcQ"
          alt="video img"
        />
        <div className={cn('video-col-end')}>
          <div className={cn('video-name')}>
            Tên videogg aj dafi moojt ty chu the nay ngan qua van chua du dau
            nen viet them di
          </div>
          <div className={cn('video-desc')}>
            Tên videogg aj dafi moojt ty chu the nay ngan qua van chua du dau
            nen viet them di
          </div>
        </div>
      </td>
      <td style={{ padding: '12px' }}>7 th 12, 2022</td>
      <td style={{ textAlign: 'right' }}>122</td>
      <td style={{ textAlign: 'right' }}>340</td>
      <td style={{ textAlign: 'right' }}>
        <div>100%</div>
        <div style={{ color: 'var(--text-color-darker)' }}>23 lượt thích</div>
      </td>
    </tr>
  )
}

export default StudioVideoBox
