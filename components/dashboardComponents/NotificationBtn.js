import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const NotificationBtn = () => {
    return (
        <div className="relative cursor-pointer">
            <Avatar>
                <AvatarImage src="/bell.svg" alt="Notification Bell Icon" />
                <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <Badge className="border-background absolute -top-1.5 left-full min-w-5 -translate-x-3.5 px-1">
                6
            </Badge>
        </div>
    )
}

export default NotificationBtn