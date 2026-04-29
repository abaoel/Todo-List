import { CheckSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

export default async function Navbar() {

    const session = await getSession();

    return (

        <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/70 backdrop-blur-xl transition-all supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105 group-hover:rotate-3">
                        <CheckSquare className="h-5 w-5" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">TODO List</span>
                </Link>
                <div className="flex items-center gap-4">
                    {session?.user ?
                        (<>

                            <Link href="/todos">
                                <Button
                                    variant="ghost"
                                    className="font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                >
                                    Todos
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-9 w-9 rounded-full ring-2 ring-transparent transition-all hover:ring-blue-500/20"
                                    >
                                        <Avatar className="h-9 w-9 shadow-sm">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium">
                                                {session.user.name[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {session.user.name}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <SignOutButton />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>)
                        :
                        <>
                            <Link href="/sign-in" >
                                <Button variant="ghost" className="font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">Log In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
                                    Start for free
                                </Button>
                            </Link>
                        </>
                    }

                </div>
            </div>
        </nav>
    )
}