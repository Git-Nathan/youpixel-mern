import styles from './Upload.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import app from '~/firebase'
import { useDispatch } from 'react-redux'
import { addVideo } from '~/actions/videoActions'
import PreviewImg from './PreviewImg'
import PreviewVideo from './PreviewVideo'

const cn = classNames.bind(styles)

function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined)
  const [video, setVideo] = useState(undefined)
  const [imgPerc, setImgPerc] = useState(0)
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        urlType === 'imgUrl'
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress))
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL }
          })
        })
      },
    )
  }

  useEffect(() => {
    video && uploadFile(video, 'videoUrl')
  }, [video])

  useEffect(() => {
    img && uploadFile(img, 'imgUrl')
  }, [img])

  const handleUpload = async (e) => {
    e.preventDefault()
    dispatch(addVideo({ ...inputs }))
    setOpen(false)
  }

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
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className={cn('desc-box')}>
                <div className={cn('title-text')}>Mô tả</div>
                <textarea
                  className={cn('text-input')}
                  rows="6"
                  placeholder="Giới thiệu về video của bạn cho người xem"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className={cn('header-2')}>Hình thu nhỏ</div>
              <div className={cn('header-2-detail')}>
                Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video
                của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và
                thu hút người xem.
              </div>
              <PreviewImg imgPerc={imgPerc} inputs={inputs} setImg={setImg} />
            </div>
            <div className={cn('right-form')}>
              <PreviewVideo
                videoPerc={videoPerc}
                inputs={inputs}
                setVideo={setVideo}
              />
            </div>
          </div>
        </div>
        <div className={cn('end')}>
          <button className={cn('save-btn')} onClick={handleUpload}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Upload
