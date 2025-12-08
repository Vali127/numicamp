import Bee from "../../assets/animations/wired-gradient-1148-bee-hover-pinch.json"
import Lottie from "lottie-react"

const Loading = () => {
  return (
    <div className='w-full bg-neutral-100 border border-neutral-200 rounded-sm p-4 flex flex-col gap-2'>
        <div className='flex justify-around'>
            <Lottie className="w-20" animationData={Bee} loop={true} />
        </div>
        <h1 className='font-bold !text-3xl bg-gradient-to-r from-green-600 to-violet-400 bg-clip-text text-transparent'>Patience</h1>
        <div>Chargement en cours... !</div>
    </div>
  )
}

export default Loading