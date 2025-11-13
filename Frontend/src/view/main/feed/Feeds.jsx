import {Newspaper} from "lucide-react";
import {UserEmptyFeeds} from "./UserEmptyFeeds.jsx";
import { FeedsViewModel } from "../../../viewmodel/main/FeedsViewModel.js";
import Feed from "./Feed.jsx";

export const Feeds = () => {
    const {
        PostData,
        isEmpty
    } =  FeedsViewModel()
    return (
        <div 
            className={"w-full grid gap-3 text-left px-3"} >
            
            <div 
                className={"font-bold text-lg flex gap-2 "} >
                <Newspaper/>
                <label className="big-title">Actualités</label>
            </div>

            <div 
                className={ "h-[81vh] overflow-y-scroll scrollbar-none"} >
                
                {
                    isEmpty ?
                    <div>No post</div> :
                    PostData.map(
                        (data,index) => (
                            <div key={index} className="mb-3" >
                                <Feed
                                    date={data.date_pub}
                                    title={data.titre_pub}
                                    description={data.description_pub}
                                    illustration={data.photo_pub}
                                    owner={ data.id_profil_org || data.id_profil_pers }
                                    postId={data.id_pub}
                                    feedOf="organisation"
                                />
                            </div>
                        )
                    )
                }

            </div>
            
        </div>
    )
}