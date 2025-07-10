import { useRooms } from '@/http/use-rooms'
import { formatRelativeDate } from '@/utils/dayjs'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export function RoomList() {
    const { data, isLoading } = useRooms()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>Acesso rápido as salas criadas recentemente.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {isLoading ? (
                    <Loader2 className="size-5 animate-spin self-center" />
                ) : (
                    data?.map((room) => {
                        return (
                            <Link
                                className="flex items-center justify-between rounded-lg border p-3 transition-all delay-75 hover:bg-accent"
                                key={room.id}
                                to={`/room/${room.id}`}
                            >
                                <div className="flex flex-1 flex-col gap-1">
                                    <h3 className="font-medium">{room.name}</h3>

                                    <div className="flex items-center gap-2">
                                        <Badge className="text-xs" variant="outline">
                                            {formatRelativeDate(room.createdAt)}
                                        </Badge>
                                        <Badge className="text-xs" variant="outline">
                                            {room.questionsCount} pergunta(s)
                                        </Badge>
                                    </div>
                                </div>

                                <span className="flex items-center justify-center gap-1 text-sm">
                                    Entrar
                                    <ArrowRight className="size-3" />
                                </span>
                            </Link>
                        )
                    })
                )}
            </CardContent>
        </Card>
    )
}
