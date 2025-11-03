import { PostApi } from "../api/PostApi"


export function PostModel () {

    const UploadPost = async ( data ) => {
        //const dataPost = new FormData()

        //dataPost.append( 'title', data.title )
        //dataPost.append( 'description', data.description )
        //dataPost.append('keywords', JSON.stringify( data.keywords ) )
        //dataPost.append( 'domains', JSON.stringify( data.domains ) )
        //dataPost.append( 'photo_pub', data.photo_pub )

        return PostApi().uploadPostApi( data )
    }



    return {
        UploadPost
    }

}