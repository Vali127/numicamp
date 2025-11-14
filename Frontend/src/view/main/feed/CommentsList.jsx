
import { CommentVM } from '../../../viewmodel/main/CommentVM'
import {UserComment} from "./UserComment.jsx";



export const CommentsList = ({ postId }) => {

    const {
        commentData
    } = CommentVM(postId)

  return (
    <div className={" flex-1 py-2 my-1 bg-neutral-50"}>
        {
            commentData.map((comment, index) => (
                <div key={index}>
                    <UserComment
                        profil={comment.photo_profil}
                        name={comment.nom_personne}
                        firstname={comment.prenom_personne || " "}
                        username={comment.nom_profil}
                        id={comment.id_pub}
                        value={comment.contenue}
                        duration={comment.date_creation_com}
                    />
                </div>
            ))
        }
    </div>
  )
}
