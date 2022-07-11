import { useParams } from "react-router-dom"

export default function UploadPodcastFile(){
    var params = useParams() // we use podcast.id from params
    return(
        <div className="mx-auto w-80 mt-4">
            <form action={"http://localhost:8000/upload?podcast_id="+params.podcast_id} enctype="multipart/form-data" method="post">
                <input type="file" name="upload" multiple="multiple" /><br />
                <input type="submit" value="Upload" />
            </form>
        </div>
    )
}