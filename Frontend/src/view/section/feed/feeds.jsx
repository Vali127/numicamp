import { FeedsVm } from "../../../viewmodel/feeds-vm/feeds.vm.js";
import EmptyFeeds from "./empty.feed.jsx";
import Feed from "./feed.jsx";

export const Feeds = () => {
    const {
        PostData,
        ownership,
        isEmpty
    } =  FeedsVm()
    return (
        <div
            className={"w-full h-full flex flex-col gap-1 text-left"} >

            <div className="sticky md:top-12 top-25 bg-neutral-50 shadow-neutral-50 shadow-2xl z-30 flex items-center gap-3 text-lg font-bold py-2">
                <label className="icon_btn">&#xE0A8;</label>
                <label>Actualités</label>
            </div>

            <div>

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
                                        ownership={ownership}
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