import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";

export const metadata = {
    title: "Sign Up"
}

export default function SignUpPage() {
    return (
        (<div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 bg-white">
                <div className="flex justify-center gap-2 md:justify-start">
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <div className="bg-dark-blue relative hidden lg:flex justify-center">
                <div className="w-[235px] h-[67px] sticky top-[50%] z-50">
                    <Image src='/logo.png' alt="stratital logo" fill priority className="" />
                </div>
            </div>
        </div>)
    );
}
