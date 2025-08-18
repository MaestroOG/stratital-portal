import Container from '@/components/dashboardComponents/Container'
import PendingUserTable from '@/components/superadminComponents/PendingUserTable';

import { getAllPendingUsers } from '@/lib/admin'

export const metadata = {
    title: "SuperAdmin Panel - Stratital Client Portal"
}

const SuperAdminPage = async () => {
    const pendingUsers = await getAllPendingUsers();
    console.log(pendingUsers);
    return (
        <main>
            <Container className={'bg-white px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Pending User Requests</h1>
                <div className='mt-6'>
                    {pendingUsers?.length === 0 && <div className='text-center p-6'>No Pending Users</div>}
                    {pendingUsers?.length > 0 && <PendingUserTable pendingUsers={pendingUsers} />}
                </div>
            </Container>
        </main>
    )
}

export default SuperAdminPage