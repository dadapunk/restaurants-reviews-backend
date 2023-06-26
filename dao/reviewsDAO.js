import { ObjectId } from 'mongodb';

let reviews;

/**
 * Data Access Object for interacting with the reviews collection.
 */
export default class ReviewsDAO {
  /**
   * Injects the database connection into the DAO.
   *
   * @param {object} conn - The database connection.
   * @returns {Promise<void>} - A Promise that resolves when the connection is injected.
   */
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews');
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  /**
   * Adds a review to a restaurant.
   *
   * @param {string} restaurantId - The ID of the restaurant.
   * @param {object} user - The user object.
   * @param {string} review - The review text.
   * @param {Date} date - The review date.
   * @returns {Promise<object>} - A Promise that resolves to the inserted review object.
   */
  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: new ObjectId(restaurantId),
      };

      console.log('Review Document:', reviewDoc); // Log the reviewDoc object

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  /**
   * Updates a review.
   *
   * @param {string} reviewId - The ID of the review.
   * @param {string} userId - The ID of the user who posted the review.
   * @param {string} text - The updated review text.
   * @param {Date} date - The updated review date.
   * @returns {Promise<object>} - A Promise that resolves to the update response object.
   */
  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { text: text, date: date } },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  /**
   * Deletes a review.
   *
   * @param {string} reviewId - The ID of the review.
   * @param {string} userId - The ID of the user who posted the review.
   * @returns {Promise<object>} - A Promise that resolves to the delete response object.
   */
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
