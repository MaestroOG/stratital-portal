import Container from '@/components/dashboardComponents/Container'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const HowToPage = () => {
    return (
        <Container className={'bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4'}>
            <Card>
                <CardHeader>
                    <CardTitle>Introducing the Stratital Agency Portal A Step by Step Guide</CardTitle>
                </CardHeader>
                <CardContent>
                    <iframe width="360" height="315" src="https://www.youtube.com/embed/WzjoTJP4SPA?si=MJXBA7SZfbng0xtQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </CardContent>
            </Card>
        </Container>
    )
}

export default HowToPage