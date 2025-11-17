import {UserComment} from "./UserComment.jsx";
import {CommentVm} from "../../../viewmodel/feeds-vm/comment.vm.js";
import {useEffect} from "react";
import {EmptyComment} from "./EmptyComment.jsx";



export function CommentsList({ postId, refresh }) {

    const {
        commentData,
        fetchComments
    } = CommentVm(postId)

    useEffect(() => {
        // fetchComments should request comments for postId and update local state
        fetchComments()
    }, [postId, refresh]) // <-- add refresh here so it runs after SendComment changes it

  return (
    <div className={" flex-1 py-2 my-1 bg-neutral-50"}>
        {
            ( commentData.length > 0 ) ?
                (
                    <div>
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
                        <div className={"text-center text-[12px] font-bold text-slate-800/35 my-3"}>il n' y a plus de commentaire</div>
                    </div>
                ) :
                ( <EmptyComment/> )
        }
    </div>
  )
}
