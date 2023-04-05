import { QuerySnapshot, addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";


const commentsColRef = collection(db, "comments");

// const q = query(commentsColRef, orderBy("createdAt"), where(id === blogId));

//get all comments
export const getAllComments = async () => {
    const data = await getDocs(commentsColRef);
    const mapData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return mapData;
}

// get real time comments where blog id is the comment.blogId
export const getComments = async ({id, blogId}) => {
    const q = query(commentsColRef, where("blogId" === id));

    const unsub = onSnapshot(q, (snapshot) => {
       const comments = [];
       QuerySnapshot.forEach(doc => {
        comments.push(doc.data().name)
       });
        console.log(comments)
    })
}




export const addComment = async ({content,currentTime, username, blogId}) => {
    try {
        await addDoc(commentsColRef, {
            content,
            currentTime,
            username,
            blogId
        })
    } catch (error) {
        alert(error.message)
    }

}