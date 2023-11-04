import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

// const DUMMY_MEETUPS = [
//     {
//         id: 1,
//         title: "Title 1",
//         address: "Address 1",
//         image: "https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737_1280.jpg"
//     },
//     {
//         id: 2,
//         title: "Title 2",
//         address: "Address 2",
//         image: "https://cdn.pixabay.com/photo/2018/08/26/23/55/woman-3633737_1280.jpg"
//     }
// ]

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />
}

// export function getServerSideProps(context) {
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect("mongodb+srv://shekhar:xER1cHLoOF4nmPkT@cluster0.frcmosy.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db()
        const meetupCollection = db.collection("meetups")
        const meetups = await meetupCollection.find().toArray()
        client.close()
    return {
        props: {
            meetups: meetups.map(item => ({
                title: item.title,
                address: item.address,
                id: item._id.toString(),
                image: item.image
            }))
        },
        revalidate: 1
    }
}

export default HomePage;