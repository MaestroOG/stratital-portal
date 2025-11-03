'use client';

import ProjectCard from './ProjectCard'
import Container from './Container'
import { useRouter, useSearchParams } from 'next/navigation';
import ResetFilterButton from './ResetFilterButton';

const ProjectCardsGrid = ({ filter, runningProjectsThisMonth, pendingProjectsThisMonth, completedProjectsThisMonth, projects }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);
        params.set('filter', filter);
        router.push(`?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            <Container className="flex justify-between items-center px-9 md:px-2 mb-4">
                <h2 className="text-lg font-semibold">Projects Overview</h2>
                <ResetFilterButton />
            </Container>
            <Container className={'grid items-stretch place-items-center grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 px-9 md:px-0 max-sm:bg-white max-sm:mt-0 max-sm:py-7'}>
                <ProjectCard className={filter === 'all' && 'border border-red'} onClick={() => handleFilter('all')} success={true} title="Total Projects" desc={`All Projects ${!filter ? 'This Month' : ''}`} number={projects?.length} />
                <ProjectCard className={filter === 'running' && 'border border-red'} onClick={() => handleFilter('running')} yellow={true} title={"Running Project"} desc={`${filter === 'running' ? 'All ' : ''}In-Progress ${!filter ? 'This Month' : ''}`} number={runningProjectsThisMonth} />
                <ProjectCard className={filter === 'pending' && 'border border-red'} onClick={() => handleFilter('pending')} title={"Pending"} desc={`${filter === 'pending' ? 'All ' : ''}Pending ${!filter ? 'This Month' : ''}`} number={pendingProjectsThisMonth} />
                <ProjectCard className={filter === 'finished' && 'border border-red'} success={true} onClick={() => handleFilter('finished')} title={"Finished Projects"} desc={`${filter === 'finished' ? 'All ' : ''}Finished ${!filter ? 'This Month' : ''}`} number={completedProjectsThisMonth} />
            </Container>
        </>
    )
}

export default ProjectCardsGrid