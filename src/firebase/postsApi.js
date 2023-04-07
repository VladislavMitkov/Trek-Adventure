import { auth, db, storage } from "./firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
	onSnapshot,
	where,
	query,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

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

// create blog post with first uploading the image to the cloud
export const onSubmitBlogPost = async ({
	title,
	date,
	category,
	description,
	image,
}) => {
	try {
		const storageRef = ref(storage, `images/${image.name + v4()}`);
		const uploadTask = uploadBytesResumable(storageRef, image);
		uploadTask.on(
			"state_changed",
			() => {},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(storageRef).then(async (url) => {
					try {
						await addDoc(postsColRef, {
							title: title,
							date,
							category,
							description,
							imageUrl: url,
							userId: auth?.currentUser?.uid,
							username: auth?.currentUser?.displayName,
							userEmail: auth?.currentUser?.email,
						});
					} catch (error) {
						console.log(error);
					}
				});
			},
		);
	} catch (error) {
		console.error(error);
	}
};

// delete blog posts
export const DeleteBlogPost = (id) => {
	const blogDoc = doc(db, "blogs", id);
	deleteDoc(blogDoc)
		.then(() => {
			console.log("Blog was deleted");
		})
		.catch((error) => {
			console.log(error);
		});
};

export const getBlogPostById = (id, callback) => {
	const docRef = doc(db, "blogs", id);
	onSnapshot(docRef, (doc) => {
		callback(doc.data());
	});
};

// update blog post
export const updateBlogPost = (id, updatedPost) => {
	const docRef = doc(db, "blogs", id);
	try {
		return updateDoc(docRef, updatedPost);
	} catch (error) {
		console.log(error);
	}
};

// getBlogByUser
export const getUserBlogs = (id, callback) => {
	const q = query(collection(db, "blogs"), where("userId", "==", id));
	onSnapshot(q, (snapshot) => {
		callback(snapshot);
	});
};
