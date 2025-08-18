import React from 'react'
import Container from './dashboardComponents/Container'
import { getUser } from '@/lib/user'

const IntroText = async () => {
    const user = await getUser();
    return (
        <Container className={'bg-white p-4 rounded-lg max-sm:mt-0'}>
            <div className="max-w-2xl">
                <h1 className="font-bold text-2xl md:text-4xl">Welcome to Stratital Client Portal, {user?.name} - {user?.agency || user?.companyName}</h1>
                <p className="mt-3">This is where you’ll find all the tailored resources, personable support, and proactive advice for your agency to help you confidently scale and fulfill on your opportunities.</p>
                <p className="mt-2">
                    From within this portal you can:
                </p>
                <ul className="ml-6 list-disc text-detail">
                    <li>Load and get started on any new project</li>
                    <li>Get information on any of our services</li>
                    <li>Reach out to our awesome Customer Service team, 24 hours a day</li>
                </ul>
                <p className="mt-4">Once your new project is loaded, our Operations team will be in touch with you within 3 to 5 hours to guide you through the next steps.</p>

                <p className="mt-4">
                    If you have any questions or need any assistance, please start an immediate live chat with our Customer Service team in the bottom right-hand corner of this window.</p>

                <p className="mt-4">We look forward to supporting your agency!</p>
            </div>
        </Container>
    )
}

export default IntroText