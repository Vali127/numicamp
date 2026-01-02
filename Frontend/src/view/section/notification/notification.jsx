import EmptyNotification from "./empty.notification.jsx";

export const Notification = () => {
    return (
        <div className={"h-full mx-3"}>
            <div className="flex items-center gap-3 text-lg font-bold mb-4"><label className="icon_btn">&#xE0D0;</label><label>Notifications</label></div>
            <EmptyNotification/>
        </div>
    )
}