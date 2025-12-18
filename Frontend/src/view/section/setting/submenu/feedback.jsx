import {SubSettingHeader} from "./SubSettingHeader.jsx";
import {FeedbackViewModel} from "../../../../viewmodel/section-vm/feedback.vm.js";
import {FeedBackLists} from "./FeedbackLists.jsx";

export const Feedback = ({setSubSetting}) => {

    const { history, feedback, setFeedback, DispatchFeedback, typeOfUser } = FeedbackViewModel()

    return (
        <div className='text-left flex flex-col h-[92%]' >
            { ( typeOfUser !== "admin" ) && <SubSettingHeader setSubSetting={setSubSetting} subsetting="feedback"/>}
            <div className='flex-1 overflow-scroll scrollbar-none'>
                { ( typeOfUser !== "admin" ) && <FeedBackInput content={feedback} setContent={setFeedback} submit={DispatchFeedback}/>}
                <FeedBackLists lists={history} />
            </div>
        </div>
    )
}


const FeedBackInput = ({content, setContent, submit}) => {

    return (
        <div className="w-full py-6">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300/60">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Votre feedback..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                    rows="4"
                />

                <div className="flex justify-end mt-3">
                    <button
                        onClick={ submit }
                        disabled={!content.trim()}
                        className={`px-6 py-2 rounded-lg font-medium transition ${
                            content.trim()
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
};