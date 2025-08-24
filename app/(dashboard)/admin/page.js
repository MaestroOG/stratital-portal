import Container from '@/components/dashboardComponents/Container'
import PendingUserTable from '@/components/superadminComponents/PendingUserTable';
import UserTable from '@/components/superadminComponents/UserTable';
import { Button } from '@/components/ui/button';

import { getAllPendingUsers, getAllUsers } from '@/lib/admin'
import Link from 'next/link';

export const metadata = {
    title: "SuperAdmin Panel - Stratital Client Portal"
}

const SuperAdminPage = async () => {
    const pendingUsers = await getAllPendingUsers();
    const allUsers = await getAllUsers();

    return (
        <main>
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <Link href={'/admin/projects'}><Button variant={'link'}>See All Projects</Button></Link>
            </Container>
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Pending User Requests</h1>
                <div className='mt-6'>
                    {pendingUsers?.length === 0 && <div className='text-center p-6'>No Pending Users</div>}
                    {pendingUsers?.length > 0 && <PendingUserTable pendingUsers={pendingUsers} />}
                </div>
            </Container>

            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">All Agencies</h1>
                <div className='mt-6'>
                    {allUsers?.length === 0 && <div className='text-center p-6'>No Users Registered!</div>}
                    {allUsers?.length > 0 && <UserTable users={allUsers} />}
                </div>
            </Container>
        </main>
    )
}

export default SuperAdminPage