import React, {FC} from 'react'
import { MdOutlineCancelPresentation } from 'react-icons/md'
import { ContinueSmallBtn } from './UI/CompButton'

interface Props {
    message:string
    close: () => void
    canProceed : boolean
    proceed : Function
}
const MobileSuccessFeedback:FC<Props> = ({message, close, canProceed, proceed}) => {
  return (
    <>
        <div className=''>
            <div className='h-[250px] w-full absolute -top-1 left-0 bg-mobilesuccess index-20 bg-cover bg-center flex items-center justify-center showfeel'>
                <div className='text-center text-white fw-600 w-11/12 mb-6'>
                    <p className=''>{message}</p>
                </div>
                {canProceed && (<ContinueSmallBtn title={'Continue'} onClick={() => proceed()}/>)}
                <MdOutlineCancelPresentation className='text-white text-3xl absolute bottom-10 cursor-pointer' onClick={close}/>
            </div>
        </div>
    </>
  )
}

export default MobileSuccessFeedback