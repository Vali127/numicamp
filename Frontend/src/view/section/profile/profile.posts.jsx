
import React from 'react'
import Feed from '../feed/feed.jsx'

const ProfilePosts = ({data, isEmpty}) => {
  return (
    <div className='px-2 pt-3'>
        {
                    isEmpty ?
                    <div>No post</div> :
                    data.map(
                        (data,index) => (
                            <div key={index} className="mb-3" >
                                <Feed
                                    date={data.date_pub}
                                    title={data.titre_pub}
                                    description={data.description_pub}
                                    illustration={data.photo_pub}
                                    owner={ data.id_profil_org || data.id_profil_pers }
                                    postId={data.id_pub}
                                    feedOf={ localStorage.getItem('usage') === "personal" ? "person" : "organisation" }
                                />
                            </div>
                        )
                    )
                }
    </div>
  )
}

export default ProfilePosts