"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';

const FilterCommentsForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filter = searchParams.get("filter") || "";

    const handleValueChange = (value) => {
        const params = new URLSearchParams(searchParams)
        params.set("filter", value)
        router.replace(`?${params.toString()}`)
    }

    return (
        <Select value={filter} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full border max-w-[300px] border-gray-200">
                <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>

                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='unread'>Unread</SelectItem>

            </SelectContent>
        </Select>
    )
}

export default FilterCommentsForm