import { auth, db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const postsColRef = collection(db, "blogs");


// get all posts
export const getAllPosts = async () => {
	const data = await getDocs(postsColRef);
	const mapData = data.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return mapData;
};



// create blog post
export const onSubmitBlogPost = async ({title, date, category, description, imageUrls}) => {
	try {
		await addDoc(postsColRef, {
			title: title,
			date,
			category,
			description,
			imageUrls,
			userId: auth?.currentUser?.uid
		})
		
	} catch (error) {
		console.error(error)
	}
} 
