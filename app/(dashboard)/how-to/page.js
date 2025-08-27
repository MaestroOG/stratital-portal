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
                    <div className="w-full max-w-xl mx-auto aspect-video">
                        <iframe
                            className="w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/WzjoTJP4SPA?si=MJXBA7SZfbng0xtQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default HowToPage