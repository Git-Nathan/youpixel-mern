import Button from '../Button'

function BlockButton({ channel, currentUser }) {
  let button
  if (channel.role === 'user') {
    button = <Button children="Chặn người dùng" small red />
  } else if (channel.role !== 'admin') {
    button = <Button children="Bỏ chặn người dùng" small />
  }

  return <>{button}</>
}

export default BlockButton
