import styles from './ReportedComment.module.scss'
import classNames from 'classnames/bind'
import Loading from '~/components/Loading'
import { useEffect, useState } from 'react'
import { getReportedComment } from '~/api/api'
import ReportedCommentBox from '~/components/Boxs/ReportedCommentBox'

const cn = classNames.bind(styles)

function ReportedComment() {
  const [loading, setLoading] = useState(true)
  const [reportedComment, setReportedComment] = useState([])

  useEffect(() => {
    const getdata = async () => {
      const { data } = await getReportedComment()
      setReportedComment(data)
      setLoading(false)
    }
    getdata()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className={cn('wrapper')}>
      <table className={cn('table')}>
        <thead>
          <tr>
            <th
              style={{ textAlign: 'left', paddingLeft: '24px', width: '24%' }}
            >
              Video
            </th>
            <th style={{ textAlign: 'left', padding: '0 12px', width: '18%' }}>
              Người bình luận
            </th>
            <th style={{ textAlign: 'right', padding: '0 12px' }}>
              Nội dung bình luận
            </th>
            <th style={{ textAlign: 'left', padding: '0 12px', width: '18%' }}>
              Người báo cáo
            </th>
            <th style={{ textAlign: 'right', padding: '0 12px' }}>
              Nội dung báo cáo
            </th>
          </tr>
        </thead>
        <tbody>
          {reportedComment.map((item) => (
            <ReportedCommentBox key={item._id} item={item} />
          ))}
        </tbody>
      </table>
      {reportedComment.length === 0 && (
        <div className={cn('no-video')}>Không có nội dung nào!</div>
      )}
    </div>
  )
}
export default ReportedComment
