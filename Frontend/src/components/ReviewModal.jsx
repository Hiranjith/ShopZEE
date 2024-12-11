import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ onClose, onSubmit, isLoading }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0 || comment.trim() === '') {
            alert('Please provide a rating and comment.');
            return;
        }
        onSubmit({ rating, comment });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block font-bold mb-2">
                            Rating:
                        </label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer text-2xl ${
                                        star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                    }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block font-bold mb-2">
                            Comment:
                        </label>
                        <textarea
                            id="comment"
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Write your review here..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-4 hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
