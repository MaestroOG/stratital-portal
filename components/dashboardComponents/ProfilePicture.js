import Image from "next/image";

const ProfilePicture = () => {
    return (
        <div className="relative w-[200px] h-[200px] group cursor-pointer">
            {/* Profile Image */}
            <Image
                src={"/placeholder-avatar.svg"}
                alt="Profile"
                width={200}
                height={200}
                className="rounded-full object-cover"
            />

            {/* Overlay on hover */}
            <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            >
                <span className="text-sm font-medium">Change</span>
            </div>
        </div>
    )
}

export default ProfilePicture