import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

const UserTable = ({ users }) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Business Name</TableHead>
                        <TableHead>Owner Name</TableHead>
                        <TableHead>Contact Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map(user => (
                        <TableRow key={user?._id}>
                            <TableCell className="font-medium">{user?.companyName}</TableCell>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-4">
                                <Link href={`/admin/user/${user?._id}`}><Button variant={'secondary'}><Image src={'/eye-open.svg'} width={24} height={24} alt='cancel' /></Button></Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default UserTable