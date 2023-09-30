import {FC} from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
interface Props {
    close: () => void
    message: string
}
const FailureFeedback:FC<Props> = ({close, message}) => {
  return (
    <>
        <div className=''>
            <div className='h-[80vh] w-[280px] absolute bottom-0 -right-3 bg-bgfailure bg-fit flex  justify-end showfeed'>
                <div className='text-center text-white fw-600 w-[85%] pr-4 mb-6 mt-[210px]'>
                    <p className='fs-700 blob-thing'>{message}</p>
                </div>
                <MdOutlineCancelPresentation className='text-white text-3xl absolute top-10 right-10 cursor-pointer' onClick={close}/>
            </div>
        </div>
    </>
  )
}

export default FailureFeedback