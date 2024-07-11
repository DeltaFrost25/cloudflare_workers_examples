-- Migration number: 0003 	 2024-07-11T14:29:51.201Z
DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_date TEXT NOT NULL,
    rating INTEGER NOT NULL
);
INSERT INTO movies (title, release_date, rating) VALUES 
('The Shawshank Redemption', '1994-06-14', 9.3),
('The Godfather', '1972-03-24', 9.2),
('The Godfather: Part II', '1974-12-24', 9.0),
('The Dark Knight', '2008-07-18', 9.0),
('12 Angry Men', '1957-06-19', 8.9),
('Pulp Fiction', '1994-05-19', 8.9);