import axios from "axios";


const useCommentAPI = () =>{
    const  addCardComment = (newComment)=> {
        console.log("addCardTaskaddCardTask");
        axios.post("/api/comments", newComment);
    }
    const  updateCardComment = ( updateComment,commentId)=> {
        axios.put(`/api/comments/${commentId}`, updateComment);
    }
    /*
    const delCardLable = (labelId)=>{
        axios.put("/api/lables", newLable,cardId);
    }*/
    const delCardComment = (id) => {
        axios.delete(`/api/comments/${id}`);
    }
    return[addCardComment,delCardComment,updateCardComment]
}
export default useCommentAPI;