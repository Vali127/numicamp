import {UserUniqueComment} from "./user.unique.comment.jsx";
import {CommentVm} from "../../../viewmodel/feeds-vm/comment.vm.js";
import {EmptyComment} from "./empty.comment.jsx";



export function CommentList({ postId, GoToProfile }) {
    const { commentData } = CommentVm(postId)

    return (
        <div className="flex-1 py-2 my-1 bg-neutral-50">
            {commentData.length > 0 ? (
                <div>
                    {commentData.map((comment, index) => (
                        <div key={index}>
                            <UserUniqueComment
                                profil={comment.photo_profil}
                                name={comment.nom_personne}
                                owner={comment.id_profil}
                                firstname={comment.prenom_personne || " "}
                                username={comment.nom_profil}
                                id={comment.id_pub}
                                value={comment.contenue}
                                duration={comment.date_creation_com}
                                GoToProfile={GoToProfile}
                            />
                        </div>
                    ))}
                    <div className="text-center text-[12px] font-bold text-slate-800/35 my-3">il n'y a plus de commentaire</div>
                </div>
            ) : (
                <EmptyComment />
            )}
        </div>
    )
}