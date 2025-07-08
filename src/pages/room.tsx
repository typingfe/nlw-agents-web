import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
    id: string
}

export const Room = () => {
    const params = useParams<RoomParams>()

    if (!params.id) {
        return <Navigate replace to="/" />
    }

    return <div>Room Details {JSON.stringify(params.id)}</div>
}
