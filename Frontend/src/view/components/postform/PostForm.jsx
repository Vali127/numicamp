import React from 'react'

const PostForm = ({postData, setPostData}) => {
  return (
    <div 
      className='flex flex-col gap-2' >
       
        <div 
          className='flex flex-col'>
            
            <b className='text-[13px]' >sujet</b>
            
            <input
              value={postData.title}
              onChange={ (e) => { setPostData({...postData, title : e.target.value}) }  } 
              type="text" 
              className='text_input input__shadow' 
              placeholder='entrer le titre ici ...' />
        
        </div>

        <div 
          className='flex flex-col'>
            
            <b className='text-[13px]' >description</b>
            
            <textarea
                value={postData.description} 
                onChange={ (e) => { setPostData({...postData, description : e.target.value }) } }
                className={'text_input resize-none input__shadow w-full h-[120px] pr-2'}
                placeholder='descriptioon de la publication...'
                ></textarea>
        
        </div>
        
    </div>
  )
}

export default PostForm