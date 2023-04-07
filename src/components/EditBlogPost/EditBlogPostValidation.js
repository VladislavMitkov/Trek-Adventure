

export const validateEditBlogPost = (title, description, errorCallback) => {
    let result = true;
    if(title.length < 3) {
        errorCallback({
            message: "error"
        })
        result = false;
    }
    if (description.length < 20) {
        errorCallback({
            message: 'error'
        })
        result = false;

    }
    return result;
}