import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

type GetRoomsAPIResponse = Array<{
    id: string
    name: string
}>

export const CreateRoom = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['get-room'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsAPIResponse = await response.json()

            return result
        },
    })

    return (
        <div className="flex flex-col gap-0.5">
            {isLoading && <p>Carregando.....</p>}
            {data?.map((room) => {
                return (
                    <Link key={room.id} to={`/room/${room.id}`}>
                        {room.name}
                    </Link>
                )
            })}
        </div>
    )
}
