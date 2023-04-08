import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import { db } from "./firebase";

const commentsColRef = collection(db, "comments");
// get real time comments where blog id is the comment.blogId
export const getComments = async ({ id, blogId }) => {
	query(commentsColRef, where("blogId", "==", id));
};

// add comment
export const addComment = async ({
	content,
	currentTime,
	username,
	userId,
	userEmail,
	blogId,
}) => {
	try {
		await addDoc(commentsColRef, {
			content,
			currentTime,
			username,
			userId,
			userEmail,
			blogId,
		});
	} catch (error) {
		alert(error.message);
	}
};

// delete comment
export const DeleteComment = (id) => {
	const commentDoc = doc(db, "comments", id);
	console.log(commentDoc);
	deleteDoc(commentDoc)
		.then(() => {
			console.log("comment was deleted");
		})
		.catch((err) => {
			console.log("nope");
		});
};
