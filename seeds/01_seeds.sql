INSERT INTO
  users (name, email, password)
VALUES
  ( 'Paola Garcia','pacola@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ( 'Geraldine Parez','gera@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ( 'Rafael Garca', 'raf@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),
  ( 'Edward Garca', 'ed@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),
  ( 'Vctoria Plane', 'vic@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' );
 
INSERT INTO
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code
  )
VALUES
  (1,'Lady Di','description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 1000, 1, 10, 3, 'Canada', 'Spadina', 'Toronto', 'Ontario','M6HT3T'),  
  (2,'El conuco de gera','description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 12000, 2, 1, 3, 'Canada', 'Spadina', 'Toronto', 'Ontario','M6HT3T'),  
  (3,'Barca club','description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 10300, 1, 2, 3, 'Canada', 'Spadina', 'Toronto', 'Ontario','M5G5G5'),  
  (5,'Le france','description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 10030, 1, 0, 3, 'Francia', 'croissant', 'Paris', 'Paris','FRHT3T'); 

 
INSERT INTO
 reservations (start_date,end_date, property_id, guest_id)
VALUES
  ('2019-05-11', '2019-09-26', 1, 5),
  ('2019-01-03', '2019-02-01', 3, 1),
  ('2021-11-01', '2021-11-03', 1, 4);
 
INSERT INTO 
  property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (5, 1, 1, 5, 'HOW CLEAN AND FREAKING AMAZING PLACE! Great view !'), 
  (1, 3, 2, 5, 'I cannot believe I found a place with my soccer team theme! '), 
  (4, 1, 3, 1, 'You could have cleaned the bathroom for us, UGH!');