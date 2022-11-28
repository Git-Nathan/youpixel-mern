import { TrashIcon } from '../../icons'
import classNames from 'classnames/bind'
import styles from './DeleteButton.module.scss'
import { useState } from 'react'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '~/firebase'
import { toast } from 'react-toastify'
import { deleteVideo } from '~/actions/videoActions'
import { useDispatch } from 'react-redux'

const cn = classNames.bind(styles)

function DeleteButton({ video, title }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    const videoRef = ref(storage, video.videoPath)
    const imageRef = ref(storage, video.imgPath)
    try {
      deleteObject(videoRef)
      deleteObject(imageRef)
      dispatch(deleteVideo(video._id))
      notify()
    } catch (error) {
      console.log(error)
    }
  }

  const notify = () =>
    toast.success('Xóa video thành công.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className={cn('option-icon')}
      >
        <TrashIcon />
      </button>
      {open && (
        <div className={cn('confirm-overlay')} onClick={() => setOpen(false)}>
          <div className={cn('confirm-wrapper')}>
            <div className={cn('confirm-text')}>{title}</div>
            <div className={cn('confirm-btn')}>
              <button
                className={cn('close-btn')}
                onClick={() => setOpen(false)}
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  handleDelete()
                }}
                className={cn('close-btn', 'accept-btn')}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteButton
