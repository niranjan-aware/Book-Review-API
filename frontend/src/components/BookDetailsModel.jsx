import React, { useState, useEffect } from "react";
import { X, Star, Edit2, Trash2, Plus } from "lucide-react";
import { useBookStore } from "../store/useBookStore";

const BookDetailsModal = ({ bookId, onClose }) => {
  const {
    currentBook,
    reviews,
    loading,
    error,
    fetchBookById,
    addReview,
    updateReview,
    deleteReview,
    clearCurrentBook,
  } = useBookStore();

  const [showAddReview, setShowAddReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (bookId) {
      fetchBookById(bookId);
    }

    return () => {
      clearCurrentBook();
    };
  }, [bookId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await updateReview(editingReview._id, reviewForm);
        setEditingReview(null);
      } else {
        await addReview(bookId, reviewForm);
        setShowAddReview(false);
      }
      setReviewForm({ rating: 5, comment: "" });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      rating: review.rating,
      comment: review.comment,
    });
    setShowAddReview(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${interactive ? "cursor-pointer" : ""} ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        onClick={interactive ? () => onChange(i + 1) : undefined}
      />
    ));
  };

  const canEditReview = (review) => {
    return true;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!currentBook) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {currentBook.book.title}
              </h3>
              <p className="text-xl text-gray-600 mb-2">
                by {currentBook.book.author}
              </p>
              <p className="text-gray-500 mb-4">{currentBook.book.genre}</p>
              <p className="text-3xl font-bold text-green-600">
                ${currentBook.book.price}
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {renderStars(currentBook.averageRating || 0)}
                </div>
                <span className="text-lg font-semibold">
                  {(currentBook.averageRating || 0).toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600">
                {currentBook.totalReviews || 0} review
                {currentBook.totalReviews !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold">Reviews</h4>
              {true && (
                <button
                  onClick={() => setShowAddReview(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Review
                </button>
              )}
            </div>

            {showAddReview && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h5 className="text-lg font-semibold mb-4">
                  {editingReview ? "Edit Review" : "Add Your Review"}
                </h5>

                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex">
                      {renderStars(reviewForm.rating, true, (rating) =>
                        setReviewForm({ ...reviewForm, rating })
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          comment: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {editingReview ? "Update Review" : "Submit Review"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddReview(false);
                        setEditingReview(null);
                        setReviewForm({ rating: 5, comment: "" });
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h6 className="font-semibold text-gray-900">
                            {review.user.username || review.user.email}
                          </h6>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {canEditReview(review) && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditReview(review)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
