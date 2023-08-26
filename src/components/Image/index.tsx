import React, {FC} from 'react'
import { ImageComponentProps } from './handler'

const ImageComponent : FC<ImageComponentProps> = ({data, slide}) => {
  return (
    <>
        <img src={data.url} alt='images' className='w-[320px] mx-auto rounded-lg'/>
    </>
  )
}

export default ImageComponent