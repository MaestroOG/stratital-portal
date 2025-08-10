import Container from '@/components/dashboardComponents/Container'
import IntroText from '@/components/IntroText'
import { Button } from '@/components/ui/button'
import { yourProjects } from '@/constants'
import Link from 'next/link'

export const metadata = {
    title: "Our Services"
}

const ProjectsPage = () => {

    return (
        <>
            <IntroText />
            <Container className={'bg-white p-4 rounded-lg'}>
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-medium">Our Services</h1>
                    <Link href={'/projects/new-project'}><Button className={'cursor-pointer'}>Add a Project</Button></Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-4">
                    {yourProjects.map(project => (
                        <div key={project.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectTitle}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{project.desc}</p>
                            <Link href={'/projects/new-project'}><Button variant={"default"}>Add Project</Button></Link>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default ProjectsPage