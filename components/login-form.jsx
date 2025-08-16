"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { LoginUser } from "@/action/user";
import { useActionState } from "react";

export function LoginForm({
  className,
  ...props
}) {

  const [message, formAction, isPending] = useActionState(LoginUser, { err: "" })
  return (
    (<form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className={'text-heading'}>Email</Label>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required className={'border border-gray-300'} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className={'text-heading'}>Password</Label>
            <Link href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required className={'border border-gray-300'} />
        </div>
        <Button disabled={isPending} type="submit" className="w-full bg-dark-blue cursor-pointer hover:bg-dark-blue">
          Login
        </Button>
      </div>
      {message?.err && <div className="text-center text-red font-bold text-xl">{message?.err}</div>}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>)
  );
}
