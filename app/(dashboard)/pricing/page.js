import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button"
import { ArrowDown } from 'lucide-react';

const PricingPage = () => {
    return (
        <Container className={'bg-white p-4 mt-6 h-[80vh]'}>
            <a className="mb-2 float-right" href="/stratital-pricelist.pdf" download="Stratital Pricelist" target='_blank'>
                <button
                    className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group cursor-pointer"
                    type="button"
                >
                    <div
                        className="bg-red rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                    >
                        <ArrowDown color="#ffffff" />
                    </div>
                    <p className="translate-x-2 text-sm">Download</p>
                </button>

            </a>
            <iframe src="/stratital-pricelist.pdf#toolbar=0" width={'100%'} height={'100%'} frameborder="0"></iframe>
        </Container>
    )
}

export default PricingPage