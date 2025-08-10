"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { yourProjects } from '@/constants'
import { useRouter, useSearchParams } from 'next/navigation';


export default function AddProjectSelect() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set("service", value)
        router.replace(`?${params.toString()}`)
    }

    return (
        <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-full border border-gray-200">
                <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
                {yourProjects.map(project => (
                    <SelectItem key={project.name} value={project.name}>{project.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}