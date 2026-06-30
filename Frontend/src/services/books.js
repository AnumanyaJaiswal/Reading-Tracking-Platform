import { api } from "./api";

export async function searchBooks(query) {
    const response = await api(`/books/search?q=${encodeURIComponent(query)}`);
    
    return response.books;
}

export async function getBookById(id) {

    const response = await api(`/books/${id}`);

    return response.book;

}