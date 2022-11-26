import classNames from 'classnames/bind'
import { useState } from 'react'
import { EditIcon } from '../icons'
import Upload from '../Upload'
import styles from './EditButton.module.scss'

const cn = classNames.bind(styles)

function EditButton({ video }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className={cn('option-icon')}
      >
        <EditIcon />
      </button>
      <div className={cn('edit-form')}>
        {open && (
          <Upload
            setOpen={setOpen}
            title="Chỉnh sửa video"
            edit={true}
            videoEdit={video}
          />
        )}
      </div>
    </>
  )
}

export default EditButton
