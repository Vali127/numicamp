import Lottie from "lottie-react";
import Ghost from "../../../assets/animations/wired-gradient-2815-ghost-hover-lol.json"

const EmptyFeeds = () => {
  return (
    <div className='text-center'>
        <div className='w-full bg-neutral-100 border border-neutral-200 rounded-sm p-4 flex flex-col gap-2'>
            <div className='flex justify-around'>
                <Lottie
                    className="w-20"
                    animationData={Ghost}
                    loop={true}
                />
            </div>
            <h1 className='font-bold !text-3xl bg-gradient-to-r from-green-600 to-violet-400 bg-clip-text text-transparent'>Booooh !!</h1>
            <div>Aucune publication disponibles pour le moment !</div>
        </div>
    </div>
  )
}

export default EmptyFeeds