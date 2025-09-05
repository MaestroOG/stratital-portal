import Container from '@/components/dashboardComponents/Container'
import DeletedUserTable from '@/components/superadminComponents/DeletedUserTable';
import PendingUserTable from '@/components/superadminComponents/PendingUserTable';
import UserTable from '@/components/superadminComponents/UserTable';
import { Button } from '@/components/ui/button';

import { getAllDeletedUsers, getAllPendingUsers, getAllUsers } from '@/lib/admin'
import Link from 'next/link';

export const metadata = {
    title: "SuperAdmin Panel - Stratital Client Portal"
}

const SuperAdminPage = async () => {
    const pendingUsers = await getAllPendingUsers();
    const allUsers = await getAllUsers();
    const deletedUser = await getAllDeletedUsers();

    return (
        <main className='h-[100vh]'>
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3 flex items-center gap-2'}>
                <Link href={'/admin/projects'}><Button variant={'link'}>See All Projects</Button></Link>
                <Link href={'/admin/create-notification'}><Button variant={'link'}>Create a global notification</Button></Link>
                <Link href={'/admin/create-manager'}><Button variant={'link'}>Assign a manager</Button></Link>
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

            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Deleted Agencies</h1>
                <div className='mt-6'>
                    {deletedUser?.length === 0 && <div className='text-center p-6'>No Deleted Users</div>}
                    {deletedUser?.length > 0 && <DeletedUserTable users={deletedUser} />}
                </div>
            </Container>
        </main>
    )
}

export default SuperAdminPage