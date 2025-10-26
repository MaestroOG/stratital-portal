import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import IntroText from "@/components/IntroText"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getUser } from "@/lib/user"
import { getAllCompletedProjects, getAllPendingProjects, getAllRunningProjects, getAllUserFinishedProjects, getAllUserPendingProjects, getAllUserProjects, getAllUserRunningProjects, getCompletedProjectsThisMonth, getEveryProject, getEveryUserProjects, getPendingProjectsThisMonth, getRunningProjectsThisMonth } from "@/lib/projects"
import { Suspense } from "react"
import { camelToNormal, capitalizeFirst } from "@/utils/formUtils"
import HomePageDialog from "@/components/dashboardComponents/HomePageDialog"
import { getLatestUnreadNotification } from "@/lib/notifications"
import { getAllCompletedProjectsThisMonth, getAllManagerRelatedProjects, getAllPendingProjectsThisMonth, getAllProjects, getAllRunningProjectsThisMonth } from "@/lib/admin"
import ProjectCardsGrid from "@/components/dashboardComponents/ProjectCardsGrid"



export const metadata = {
  title: "Stratital Client Portal"
}

const HomePage = async ({ searchParams }) => {

  const user = await getUser();

  const { filter } = await searchParams;

  let projects;
  let completedProjectsThisMonth;
  let pendingProjectsThisMonth;
  let runningProjectsThisMonth;

  if (user?.role === 'user') {
    if (filter === 'all') {
      projects = await getEveryUserProjects(user?._id);
    } else if (filter === 'finished') {
      projects = await getAllUserFinishedProjects(user?._id);
    } else if (filter === 'running') {
      projects = await getAllUserRunningProjects(user?._id);
    } else if (filter === 'pending') {
      projects = await getAllUserPendingProjects(user?._id);
    } else {
      projects = await getAllUserProjects(user?._id);
    }
    completedProjectsThisMonth = await getCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getPendingProjectsThisMonth();
    runningProjectsThisMonth = await getRunningProjectsThisMonth();
  } else if (user?.role === 'manager') {
    projects = await getAllManagerRelatedProjects();
    completedProjectsThisMonth = await getAllCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getAllPendingProjectsThisMonth();
    runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
  } else {
    if (filter === 'finished') {
      projects = await getAllCompletedProjects();
    } else if (filter === 'running') {
      projects = await getAllRunningProjects();
    } else if (filter === 'all') {
      projects = await getEveryProject();
    } else if (filter === 'pending') {
      projects = await getAllPendingProjects();
    } else {
      projects = await getAllProjects();
    }
    completedProjectsThisMonth = await getAllCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getAllPendingProjectsThisMonth();
    runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
  }
  const latestNotification = await getLatestUnreadNotification();



  return (
    <>

      <div className="px-11 py-7 md:hidden max-sm:bg-white">

        <div className="bg-white w-full h-12 rounded-xl flex items-center">
          <Input placeholder="Search..." className={'placeholder:text-placeholder h-full rounded-tr-none rounded-br-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none'} />
          <Button className={'h-full px-4 py-3 rounded-tl-none rounded-bl-none'}><Search className="text-white" width={25} height={25} /></Button>
        </div>

      </div>

      <IntroText />

      <ProjectCardsGrid runningProjectsThisMonth={runningProjectsThisMonth} projects={projects} completedProjectsThisMonth={completedProjectsThisMonth} pendingProjectsThisMonth={pendingProjectsThisMonth} />

      <Container className="bg-white p-4 rounded-lg">
        <div className="flex items-center md:justify-between gap-4">
          <h1 className="text-xl font-medium">Your Projects</h1>
          <div className="flex items-center gap-2">
            <Link href={'/projects/completed'}><Button>See Completed Projects</Button></Link>
            <Link href={'/projects/archived'}><Button>See Archived Projects</Button></Link>
            {user?.role === 'superadmin' && <Link href={'/projects/all'}><Button>See All Projects</Button></Link>}
            <Link href={'/expenditure'}><Button>See {user?.role === 'superadmin' ? 'Generated Revenue' : 'Monthly Expenditure'}</Button></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">


          {projects?.length === 0 && (
            <div className="p-6">
              {user?.role !== 'manager' && <span>No Projects For Now!</span>}
              {user?.role === 'manager' && <span>Wait for your first project to be assigned!</span>}
            </div>
          )}
          <Suspense fallback={<p>Loading...</p>}>
            {projects?.map(project => (
              <div key={project._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <Badge variant={"secondary"} className={'mb-2'}>{camelToNormal(project.service)}</Badge>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectTitle}</h5>
                <p className="mb-3 font-medium">By: {project?.createdBy?.companyName ?? ''}</p>
                <p className="mb-3 font-medium text-red animate-pulse">• {capitalizeFirst(project?.status) || ""}</p>
                <Link href={`/projects/${project?._id}`}><Button variant={"default"}>Project Details</Button></Link>
              </div>
            ))}
          </Suspense>

        </div>
      </Container>

      {latestNotification && <HomePageDialog title={latestNotification?.title} description={latestNotification?.description} />}
    </>
  )
}

export default HomePage