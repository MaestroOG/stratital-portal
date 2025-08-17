import Container from '@/components/dashboardComponents/Container'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAllPendingUsers } from '@/lib/admin'
import Image from 'next/image'

export const metadata = {
    title: "SuperAdmin Panel - Stratital Client Portal"
}

const SuperAdminPage = async () => {
    const pendingUsers = await getAllPendingUsers();
    console.log(pendingUsers)
    return (
        <main>
            <Container className={'bg-white px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Pending User Requests</h1>
                <div className='mt-6'>
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
                            {pendingUsers?.map(user => (
                                <TableRow key={user?._id}>
                                    <TableCell className="font-medium">{user?.companyName}</TableCell>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell className="text-right flex items-center justify-end gap-4">
                                        <Button><Image src={'/tick.svg'} width={24} height={24} alt='tick' /></Button>
                                        <Button variant={'secondary'}><Image src={'/cancel.svg'} width={24} height={24} alt='cancel' /></Button>
                                        <Button variant={'secondary'}><Image src={'/arrow-right.svg'} width={24} height={24} alt='cancel' /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Container>
        </main>
    )
}

export default SuperAdminPage