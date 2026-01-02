import icon from "../../assets/images/numicamp.png"

export const Header = () => {
    return (
        <div className={"flex gap-2 items-center justify-center"}>
            <div className={"w-8 h-8"}>
                <img src={icon} alt="logo" className={"h-full w-full"} />
            </div>
            <div className={"font-bold hidden md:flex text-indigo-500 text-3xl big-title h-12 items-end justify-center"}>
                NUMICAMP
            </div>
        </div>
    )
}