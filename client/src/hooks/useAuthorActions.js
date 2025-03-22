import axiosInstance from "../api/axios";

const useAuthorActions = () => {
    const fetchAllAuthors = async () => {
        const response = await axiosInstance.get(`/api/author/getAllAuthors`)
        // console.log("AUTHOR", response.data);
        return response.data.authors;
    }

    const fetchAuthorById = async (id) => {
        const response = await axiosInstance.get(`/api/author/getAuthor?id=${id}`);
        return response.data;
    }

    return { fetchAllAuthors, fetchAuthorById };
}

export default useAuthorActions