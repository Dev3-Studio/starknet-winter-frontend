import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/accordion"
export function Faq(props: {question: string, answer: string}) {
    return (
        <Accordion type="single" collapsible className='w-4/5 mx-auto'>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">{props.question}</AccordionTrigger>
                <AccordionContent>
                    {props.answer}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
    
}