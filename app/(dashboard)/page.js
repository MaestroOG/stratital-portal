import BudgetCard from "@/components/dashboardComponents/BudgetCard"
import Container from "@/components/dashboardComponents/Container"
import Header from "@/components/dashboardComponents/Header"
import ProjectCard from "@/components/dashboardComponents/ProjectCard"
import ProjectTeamTable from "@/components/dashboardComponents/ProjectTeamTable"
import TimeGraphCard from "@/components/dashboardComponents/TimeGraphCard"
import DatePicker from "@/components/dashboardComponents/DatePicker"
import TransactionCard from "@/components/dashboardComponents/TransactionCard"
import ProjectFileCard from "@/components/dashboardComponents/ProjectFileCard"
import TechTable from "@/components/dashboardComponents/TechTable"
import EarningReportCard from "@/components/dashboardComponents/EarningReportCard"

export const metadata = {
  title: "Stratital Client Portal"
}

const HomePage = () => {
  return (
    <>
      <Header />
      <Container className={'grid items-stretch grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4'}>
        <ProjectCard success={true} title="Total Projects" desc="All Projects This Month" number={404} />
        <ProjectCard yellow={true} title={"Running Project"} desc={"Delayed This Month"} number={128} />
        <ProjectCard title={"Pending"} desc={"Pending This Month"} number={43} />
        <ProjectCard success={true} title={"Finished Projects"} desc={"Finished This Month"} number={161} />


      </Container>

      <Container className={'flex items-stretch gap-6'}>
        <ProjectTeamTable />
        <BudgetCard />
      </Container>

      <Container className={'flex items-start gap-6'}>
        <TimeGraphCard title="Total Spent Hours" success={true} />
        <TimeGraphCard title="Average Week Report" success={false} />
        <DatePicker />
      </Container>

      <Container className={'flex items-start gap-6'}>
        <TransactionCard />
        <ProjectFileCard />
      </Container>

      <Container className={'flex items-center'}>
        <TechTable />
      </Container>
      <Container className={'flex items-center'}>
        <EarningReportCard />
      </Container>
    </>
  )
}

export default HomePage