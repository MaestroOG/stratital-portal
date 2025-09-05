import Container from "@/components/dashboardComponents/Container"
import ProjectCard from "@/components/dashboardComponents/ProjectCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import IntroText from "@/components/IntroText"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { getUser, isFirstLogin } from "@/lib/user"
import { getAllUserProjects, getCompletedProjectsThisMonth, getPendingProjectsThisMonth, getRunningProjectsThisMonth } from "@/lib/projects"
import { Suspense } from "react"
import { camelToNormal, capitalizeFirst } from "@/utils/formUtils"
import HomePageDialog from "@/components/dashboardComponents/HomePageDialog"
import { getLatestUnreadNotification } from "@/lib/notifications"
import NewLoginDialog from "@/components/dashboardComponents/NewLoginDialog"
import { getAllCompletedProjectsThisMonth, getAllManagerRelatedProjects, getAllPendingProjectsThisMonth, getAllProjects, getAllRunningProjectsThisMonth } from "@/lib/admin"



export const metadata = {
  title: "Stratital Client Portal"
}

const HomePage = async () => {

  const user = await getUser();

  let projects;
  let completedProjectsThisMonth;
  let pendingProjectsThisMonth;
  let runningProjectsThisMonth;

  if (user?.role === 'user') {
    projects = await getAllUserProjects(user?._id);
    completedProjectsThisMonth = await getCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getPendingProjectsThisMonth();
    runningProjectsThisMonth = await getRunningProjectsThisMonth();
  } else if (user?.role === 'manager') {
    projects = await getAllManagerRelatedProjects();
  } else {
    projects = await getAllProjects();
    completedProjectsThisMonth = await getAllCompletedProjectsThisMonth();
    pendingProjectsThisMonth = await getAllPendingProjectsThisMonth();
    runningProjectsThisMonth = await getAllRunningProjectsThisMonth();
  }
  const latestNotification = await getLatestUnreadNotification();



  const firstLogin = await isFirstLogin();


  return (
    <>

      <div className="px-11 py-7 md:hidden max-sm:bg-white">

        <div className="bg-white w-full h-12 rounded-xl flex items-center">
          <Input placeholder="Search..." className={'placeholder:text-placeholder h-full rounded-tr-none rounded-br-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none'} />
          <Button className={'h-full px-4 py-3 rounded-tl-none rounded-bl-none'}><Search className="text-white" width={25} height={25} /></Button>
        </div>

      </div>

      <IntroText />



      <Container className={'grid items-stretch place-items-center grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 px-9 md:px-0 max-sm:bg-white max-sm:mt-0 max-sm:py-7'}>
        <ProjectCard success={true} title="Total Projects" desc="All Projects This Month" number={projects?.length} />
        <ProjectCard yellow={true} title={"Running Project"} desc={"In-Progress This Month"} number={runningProjectsThisMonth} />
        <ProjectCard title={"Pending"} desc={"Pending This Month"} number={pendingProjectsThisMonth} />
        <ProjectCard success={true} title={"Finished Projects"} desc={"Finished This Month"} number={completedProjectsThisMonth} />


      </Container>

      <Container className="bg-white p-4 rounded-lg">
        <div className="flex items-center max-sm:justify-between gap-4">
          <h1 className="text-xl font-medium">Your Projects</h1>
          {user?.role !== 'manager' && <>
            <Link className="hidden md:block" href={'/projects/new-project'}><Button className={'cursor-pointer'}>Add a Project</Button></Link>
            <Link className="md:hidden" href={'/projects/new-project'}><Button className={'cursor-pointer rounded-full'}><Plus className="text-white" /></Button></Link>
          </>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4">


          {projects?.length === 0 && (
            <div className="p-6">
              {user?.role !== 'manager' && <span>Add your first project to get started!</span>}
              {user?.role === 'manager' && <span>Wait for your first project to be assigned!</span>}
            </div>
          )}
          <Suspense fallback={<p>Loading...</p>}>
            {projects?.map(project => (
              <div key={project._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <Badge variant={"secondary"} className={'mb-2'}>{camelToNormal(project.service)}</Badge>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.projectTitle}</h5>
                <p className="mb-3 font-medium text-red animate-pulse">• {capitalizeFirst(project?.status) || ""}</p>
                <Link href={`/projects/${project?._id}`}><Button variant={"default"}>Project Details</Button></Link>
              </div>
            ))}
          </Suspense>

        </div>
      </Container>

      {latestNotification && <HomePageDialog title={latestNotification?.title} description={latestNotification?.description} />}

      {firstLogin && <NewLoginDialog userId={user?._id} firstLogin={firstLogin} />}
    </>
  )
}

export default HomePage