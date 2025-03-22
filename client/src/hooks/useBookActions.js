import axiosInstance from "../api/axios";

const useBookActions = () => {
    const fetchFilteredBooks = async(searchTerm, selectedCategories, selectedAuthors, priceRange) => {
        const params = {
            searchTerm: searchTerm || "",
            categories: selectedCategories.length ? selectedCategories.join(",") : undefined,
            authors: selectedAuthors.length ? selectedAuthors.join(",") : undefined,
            priceRange: priceRange ? priceRange.join(",") : undefined,
        };


        const response = await axiosInstance.get(`/api/books/getFilterBooks`, { params });

        return response.data.books;
    }

    const fetchBookFilters = async() => {
        const response = await axiosInstance.get(`/api/books/getBookFilters`);
        return response.data;
    }

    const fetchRecommendedBooks = async(category, id) => {
        if(!category || !id) return [];

        const response = await axiosInstance.get(`/api/books/getRecommendedBooks`, {
            params: { category, id }
        });

        return response.data.books;
    }

    const fetchBooksByCategory = async(category) => {
        const response = await axiosInstance.get(`/api/books/getBook?category=${category}`);
        return response.data.books;
      }

    const fetchAuthorBooks = async(author) => {
        const response = await axiosInstance.get(`/api/books/getBooksByAuthor?author=${author}`);
        return response.data.books;
    }

    return { fetchFilteredBooks, fetchBookFilters, fetchRecommendedBooks, fetchBooksByCategory, fetchAuthorBooks };
}

export default useBookActions
