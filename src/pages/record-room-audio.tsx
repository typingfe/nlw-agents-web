import { Button } from '@/components/ui/button'
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const isRecordingSupported =
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function' &&
    typeof window.MediaRecorder === 'function'

type RoomParams = {
    roomId: string
}

export function RecordRoomAudio() {
    const params = useParams<RoomParams>()
    const [isRecording, setIsRecording] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    function stopRecording() {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== 'inactive') {
            recorder.current.stop()
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    async function uploadAudio(audio: Blob) {
        const formData = new FormData()

        formData.append('file', audio, 'audio.webm')

        const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()

        // biome-ignore lint/suspicious/noConsole: test
        console.log(result)
    }

    function createRecorder(audio: MediaStream) {
        recorder.current = new MediaRecorder(audio, {
            mimeType: 'audio/webm',
            audioBitsPerSecond: 64_000,
        })

        recorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                uploadAudio(event.data)
            }
        }

        recorder.current.onstart = () => {
            // biome-ignore lint/suspicious/noConsole: test
            console.log('Gravação iniciada.')
        }

        recorder.current.onstop = () => {
            // biome-ignore lint/suspicious/noConsole: test
            console.log('Gravação encerrada.')
        }

        recorder.current.start()
    }

    async function startRecording() {
        if (!isRecordingSupported) {
            alert('Seu navegador não suporta gravação.')
            return
        }
        setIsRecording((prev) => !prev)

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
                sampleRate: 44_100,
            },
        })

        createRecorder(audio)

        intervalRef.current = setInterval(() => {
            recorder.current?.stop()

            createRecorder(audio)
        }, 5000)
    }

    if (!params.roomId) {
        return <Navigate replace to="/" />
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3.5">
            {isRecording ? (
                <Button className={'cursor-pointer bg-zinc-200 transition hover:bg-zinc-400 '} onClick={stopRecording}>
                    Pausar Gravação
                </Button>
            ) : (
                <Button className={'cursor-pointer bg-zinc-200 transition hover:bg-zinc-400 '} onClick={startRecording}>
                    Gravar áudio
                </Button>
            )}
            {isRecording ? 'Gravando...' : 'Clique para começar a gravar.'}
        </div>
    )
}
