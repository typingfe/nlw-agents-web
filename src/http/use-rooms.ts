import { useQuery } from '@tanstack/react-query'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
    return useQuery({
        queryKey: ['get-room'],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            const response = await fetch('http://localhost:3333/rooms')
            const result: GetRoomsResponse = await response.json()

            return result
        },
    })
}
