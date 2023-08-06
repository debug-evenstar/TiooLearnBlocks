import React, {FC} from 'react'
import ButtonComponent from '../Button/index'

interface GroupProps{
    data: any
    manager: any
}
const ButtonGroupComponent:FC<GroupProps> = ({data, manager}) => {
  return (
    <>
        <div className='grid grid-rows-2 gap-6'>
        {
            !!data.length && data.map((item:any, index:number) => (
                <ButtonComponent onClick={() => false} title={item} index={index}/>
            ))
        }
        </div>
    </>
  )
}

export default ButtonGroupComponent