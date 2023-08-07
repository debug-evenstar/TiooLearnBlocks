import React, {FC} from 'react'

interface Props {
    url: string
}
const ImageComponent:FC<Props> = ({url}) => {
  return (
    <>
        <img src={url} alt='image' className='w-8/12 mx-auto rounded-lg'/>
    </>
  )
}

export default ImageComponent