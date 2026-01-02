export const UserProfile = ({ setSection, profile }) => {
    return (
        <div
            onClick={() => setSection("profile")}
            className=" block md:hidden  w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-md flex-shrink-0">
            <img
                src={profile}
                alt="profile"
                className="w-full h-full object-cover" />
        </div>
    )
}