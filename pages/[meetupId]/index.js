import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailPage(props) {
    console.log("props: ", props)
    return <MeetupDetail
    title={props.meetupData.title}
    address={props.meetupData.address}
    image={props.meetupData.image}
    />
}

export async function getStaticPaths() {

    const client = await MongoClient.connect("mongodb+srv://shekhar:xER1cHLoOF4nmPkT@cluster0.frcmosy.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()
    const meetupCollection = db.collection("meetups")
    const meetups = await meetupCollection.find().toArray()
    client.close()

    return {
        fallback: false,
        paths: meetups.map((item) => ({
            params: {
                meetupId: item._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    console.log(meetupId)
    const client = await MongoClient.connect("mongodb+srv://shekhar:xER1cHLoOF4nmPkT@cluster0.frcmosy.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()
    const meetupCollection = db.collection("meetups")
    const selectedMeetupData = await meetupCollection.findOne({_id: new ObjectId(meetupId)})
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetupData._id.toString(),
                image: selectedMeetupData.image,
                title: selectedMeetupData.title,
                address: selectedMeetupData.address
            }
        }
    }
}


export default MeetupDetailPage;