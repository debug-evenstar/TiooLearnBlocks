import React from 'react'
import { BsInfoCircle } from 'react-icons/bs'

const PromptBox = () => {
  return (
    <>
        <div>
            <p className='flex items-center gap-x-4'>Add a prompt <BsInfoCircle/></p>
            <div>
                <textarea className='rounded border h-24 mt-3 w-full border-[#87909E99]'/>
                <button type="button" className='w-full mt-3 py-2 rounded-lg border border-[#4F46E51A] text-[#87909E]'>Update</button>
            </div>
        </div>
    </>
  )
}

export default PromptBox