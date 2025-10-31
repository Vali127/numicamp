import { Camera, Trash } from 'lucide-react'
import React from 'react'

const ImageInput = ({image, HandleImage, resetImage }) => {
    const HandleClick =() => {
        alert("clicked")
    }
  return (
    <div className='w-full h-25 my-2' >
        <div 
            className={ (!image) ? "flex flex-col items-center text-center relative justify-center  w-25 h-25 bg-gray-200 rounded border-2 border-gray-400 text-gray-400 hover:text-blue-600 hover:border-blue-500 border-dashed cursor-pointer"
                : "w-fit rounded-lg overflow-hidden relative" 
             }
             >
                { !image && <div className='text-center flex flex-col items-center' ><Camera/>Photo</div> }
                { image && <img src={URL.createObjectURL(image)} alt='image' className='h-25' /> }
                <input
                    id="imageInput" 
                    type="file" 
                    accept="image/*"
                    onChange={HandleImage} 
                    className='absolute top-0 left-0 w-full h-full opacity-0'
                />
                 { image && <button onClick={resetImage} className='icon_btn text-center font-bold absolute top-1 right-1 w-6 h-6 text-white/90 bg-black/50 hover:text-white cursor-pointer  rounded-full' > &#xe4a8;</button> }
        </div>
    </div>
  )
}

export default ImageInput