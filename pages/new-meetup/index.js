import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {

    const router = useRouter()

    async function onAddMeetupHandler(data) {
        // console.log(data)
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const jsonResponse = await response.json()
        console.log("jsonResponse: ", jsonResponse)
        router.push("/")
    }

    return <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
}

export default NewMeetupPage;