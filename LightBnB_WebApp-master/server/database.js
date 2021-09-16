const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool} = require('pg')

const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123',
  port: 5432
})
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;

  return pool
    .query(queryString, [email])
    .then(result => result.rows.length ? result.rows[0] : null)
    .catch((err) => err.message);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1`;

  return pool
    .query(queryString, [id])
    .then(result => result.rows.length ? result.rows[0] : null)
    .catch((err) => err.message);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user.name, user.email, user.password];
  return pool
    .query(queryString, values)
    .then(result => console.log(result))
    .catch((err) => err.message);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT * FROM reservations 
          WHERE guest_id = $1 
          AND ( (start_date < now()::date AND end_date < now()::date) 
          OR (start_date > now()::date AND end_date > now()::date)) 
          LIMIT $2`;

  const values = [guest_id, limit];
  return pool
    .query(queryString, values)
    .then(result => result.rows)
    .catch((err) => err.message);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {

  const queryParams = []; 
  let queryString = `
        SELECT properties.*, avg(property_reviews.rating) as average_rating
        FROM properties
        JOIN property_reviews ON properties.id = property_id
        `;
 
  if (options.city) {
    queryParams.push(`%${options.city}%`); 
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
 
  if (options.owner_id) {
    queryString+= queryParams.length === 0 ? `WHERE ` : `AND `;
    queryParams.push(`%${options.owner_id}%`);
    queryString += `properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) { 
    queryString+= queryParams.length === 0 ? `WHERE ` : `AND `;
    queryParams.push(options.minimum_price_per_night * 100);    
    queryString += `properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) { 
    queryString+= queryParams.length === 0 ? `WHERE ` : `AND `;
    queryParams.push(options.maximum_price_per_night * 100); 
    queryString += `properties.cost_per_night <= $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id 
  `;

  if (options.minimum_rating) {  
    queryParams.push(parseInt(options.minimum_rating)); 
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
 
  queryParams.push(limit);
  queryString += ` 
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;
   
  return pool.query(queryString, queryParams)
  .then((res) => res.rows)
  .catch((err) => err.message);

};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  
  const queryString = `INSERT INTO
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, number_of_bathrooms, number_of_bedrooms, street, city, province, post_code, country)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;

  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.number_of_bathrooms, property.number_of_bedrooms, property.street, property.city, property.province, property.post_code, property.country];

  return pool
  .query(queryString, values)
  .then(result => console.log(result))
  .catch((err) => err.message);

}
exports.addProperty = addProperty;