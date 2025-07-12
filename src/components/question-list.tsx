import { useRoomQuestions } from '@/http/use-room-questions'
import { Loader2 } from 'lucide-react'
import { QuestionItem } from './question-item'

interface QuestionListProps {
    roomId: string
}

export function QuestionList({ roomId }: QuestionListProps) {
    const { data, isLoading } = useRoomQuestions(roomId)

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-foreground">Perguntas & Respostas</h2>
            </div>

            {isLoading ? (
                <div className="my-4">
                    <Loader2 className="animate-spin" />
                </div>
            ) : (
                data?.map((question) => {
                    return <QuestionItem key={question.id} question={question} />
                })
            )}
        </div>
    )
}
