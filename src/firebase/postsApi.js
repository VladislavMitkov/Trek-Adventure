import { auth, db, storage } from "./firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
// get blogpost by id
export const getSingleBlogPost = async (blogId) => {
	const docRef = doc(db, "blogs", blogId);

	const singleBlog = await getDoc(docRef).then((doc) => {
		doc.data();
	});
	return singleBlog;
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
		const storageRef = ref(storage, `images/${image.name}`);
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
							imageUrls: url,
							userId: auth?.currentUser?.uid,
							userName: auth?.currentUser?.displayName,
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

// updating blog post

