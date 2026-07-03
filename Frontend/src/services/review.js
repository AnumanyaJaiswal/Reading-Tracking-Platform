import { api } from './api'

export const getMyReview = async () => {
    const response = await api('/reviews/me');
    return response.reviews;
}

export const updateReview = async (id, reviewData) => {
    const response = await api(`/reviews/${id}`, {
        method: "PATCH",
        body: JSON.stringify(reviewData),
    });

    return response.book;
}