'use client';

import ProjectCard from './ProjectCard'
import Container from './Container'
import { useRouter, useSearchParams } from 'next/navigation';

const ProjectCardsGrid = ({ filter, runningProjectsThisMonth, pendingProjectsThisMonth, completedProjectsThisMonth, projects }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', filter);
        router.push(`?${params.toString()}`, { scroll: false });
    }

    return (
        <Container className={'grid items-stretch place-items-center grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 px-9 md:px-0 max-sm:bg-white max-sm:mt-0 max-sm:py-7'}>
            <ProjectCard onClick={() => handleFilter('all')} success={true} title="Total Projects" desc={`All Projects ${!filter ? 'This Month' : ''}`} number={projects?.length} />
            <ProjectCard onClick={() => handleFilter('running')} yellow={true} title={"Running Project"} desc={`In-Progress ${!filter ? 'This Month' : ''}`} number={runningProjectsThisMonth} />
            <ProjectCard onClick={() => handleFilter('pending')} title={"Pending"} desc={`Pending ${!filter ? 'This Month' : ''}`} number={pendingProjectsThisMonth} />
            <ProjectCard success={true} onClick={() => handleFilter('finished')} title={"Finished Projects"} desc={`Finished ${!filter ? 'This Month' : ''}`} number={completedProjectsThisMonth} />
        </Container>
    )
}

export default ProjectCardsGrid