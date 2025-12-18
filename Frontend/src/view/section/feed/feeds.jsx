import { FeedsVm } from "../../../viewmodel/feeds-vm/feeds.vm.js";
import EmptyFeeds from "./empty.feed.jsx";
import Feed from "./feed.jsx";

export const Feeds = () => {
    const {
        PostData,
        isEmpty
    } =  FeedsVm()
    return (
        <div 
            className={"w-full h-full flex flex-col gap-3 text-left px-3 "} >
            
            <div className="flex items-center gap-3 text-2xl font-bold mb-4"><label className="icon_btn">&#xE0A8;</label><label>Actualités</label></div>

            <div
                className={ " w-full flex-1 overflow-scroll scrollbar-none"} >

                {
                    isEmpty ?
                        <EmptyFeeds/> :
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