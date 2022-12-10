import { useState } from 'react'
import { block } from '~/api/api'
import ConfirmOverlay from '~/components/ConfirmOverlay'
import Button from '../Button'

function BlockButton({ channel, currentUser }) {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [blockMessage, setBlockMessage] = useState('')

  const handleBlock = async () => {
    await block(channel._id, { blockMessage })
  }

  const handleUnBlock = async () => {}

  let button
  if (channel.role === 'user') {
    button = (
      <Button
        children="Chặn người dùng"
        small
        red
        onClick={() => {
          setOpen(true)
        }}
      />
    )
  } else if (channel?.role && channel.role !== 'admin') {
    button = (
      <Button
        children="Bỏ chặn người dùng"
        small
        onClick={() => {
          setOpen2(true)
        }}
      />
    )
  }

  return (
    <>
      {button}
      {open && (
        <ConfirmOverlay
          title={`Bạn có chắc muốn chặn ${channel.name}?`}
          setOpen={setOpen}
          confirmText="Chặn"
          setMessage={setBlockMessage}
          onConfirm={handleBlock}
        />
      )}
      {open2 && (
        <ConfirmOverlay
          title={`Bạn có chắc muốn bỏ chặn ${channel.name}?`}
          setOpen={setOpen2}
          confirmText="Chặn"
          onConfirm={handleUnBlock}
        />
      )}
    </>
  )
}

export default BlockButton
