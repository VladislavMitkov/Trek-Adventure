import { auth, db } from "./firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
} from "firebase/firestore";

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

//get my posts
export const getMyPosts = async () => {
	const data = await getDocs(postsColRef);
	const mapData = data.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	const filteredData = mapData.filter(
		(data) => data.userId === auth?.currentUser?.uid,
	);
	return filteredData;
};

// create blog post
export const onSubmitBlogPost = async ({
	title,
	date,
	category,
	description,
	imageUrls,
}) => {
	try {
		await addDoc(postsColRef, {
			title: title,
			date,
			category,
			description,
			imageUrls,
			userId: auth?.currentUser?.uid,
		});
	} catch (error) {
		console.error(error);
	}
};

// delete blog posts
export const DeleteBlogPost = async (id) => {
	const blogDoc = doc(db, "blogs", id);
	await deleteDoc(blogDoc);
};
