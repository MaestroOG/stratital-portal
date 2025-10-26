import AssignCreditForm from '@/components/assign-credit-form'
import Container from '@/components/dashboardComponents/Container'
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/lib/admin'
import Link from 'next/link';

const AssignCreditPage = async () => {
    const users = await getAllUsers();
    return (
        <>
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3 flex items-center gap-2'}>
                <Link href={'/admin/assign-credit/edit-credit'}><Button variant={'link'}>Edit Credit</Button></Link>
            </Container>
            <Container className={'bg-white px-2 pr-4 md:pr-0 md:px-4 py-3'}>
                <h1 className="font-bold text-2xl md:text-4xl">Assign credit</h1>
                <div className='mt-6'>
                    <AssignCreditForm users={users} />
                </div>
            </Container>
        </>
    )
}

export default AssignCreditPage