## 1. Car
``` sql
SELECT * FROM movies WHERE name LIKE 'Car %';
```

## 2. Birthyear
``` sql
SELECT * FROM movies WHERE year=1985;
```

## 3. 1982
``` sql
SELECT COUNT(*) as count FROM movies WHERE year=1982;
```

## 4. Stacktors
``` sql
SELECT * FROM actors WHERE last_name LIKE '%stack%';
```

## 5. Fame Name Game
``` sql
SELECT COUNT(*), first_name FROM actors 
GROUP BY first_name 
ORDER BY COUNT(*) DESC LIMIT 10;

SELECT COUNT(*), last_name FROM actors 
GROUP BY last_name 
ORDER BY COUNT(*) DESC LIMIT 10;
```

## 6. Prolific
``` sql
SELECT actors.first_name, actors.last_name, COUNT(*) FROM actors 
JOIN roles ON actors.id = roles.actor_id 
GROUP BY roles.actor_id 
ORDER BY COUNT(*) DESC LIMIT 100;
```

## 7. Bottom of the Barrel
``` sql
SELECT genre, COUNT(*) as num_movies FROM movies_genres GROUP BY genre 
ORDER BY num_movies asc;
```

## 8. Braveheart
``` sql
SELECT actors.id, actors.first_name, actors.last_name FROM actors 
JOIN roles ON actors.id = roles.actor_id 
JOIN movies ON roles.movie_id = movies.id 
WHERE movies.name="Braveheart" AND movies.year=1995;
```

## 9. Leap Noir
``` sql
SELECT directors.first_name, directors.last_name, movies.name, movies.year FROM directors 
JOIN movies_directors ON directors.id = movies_directors.director_id 
JOIN movies_genres ON movies_directors.movie_id = movies_genres.movie_id 
JOIN movies ON movies.id = movies_genres.movie_id 
WHERE movies_genres.genre = 'Film-Noir' AND movies.year % 4 = 0;
```

## 10. Bacon
``` sql
SELECT movies.name, actors.first_name, actors.last_name FROM actors 
JOIN roles ON actors.id = roles.actor_id 
JOIN movies ON roles.movie_id = movies.id 
JOIN movies_genres ON movies.id = movies_genres.movie_id WHERE movies_genres.genre = 'Drama' AND movies.id IN
(
SELECT movies.id FROM movies 
JOIN roles ON movies.id = roles.movie_id 
JOIN actors ON roles.actor_id = actors.id 
WHERE actors.first_name = 'Kevin' AND actors.last_name = 'Bacon'
);

```

## 11. Immortal Actors
``` sql
SELECT actors.first_name, actors.last_name, actors.id 
FROM actors 
JOIN roles ON actors.id = roles.actor_id 
JOIN movies ON roles.movie_id = movies.id 
WHERE movies.year < 1900 AND actors.id IN 
(
SELECT actors.id FROM actors 
JOIN roles ON actors.id = roles.actor_id 
JOIN movies ON roles.movie_id = movies.id 
WHERE movies.year > 2000
)
GROUP BY actors.id;
```


## 12. Busy Filming
``` sql
SELECT actors.first_name, actors.last_name, COUNT(DISTINCT roles.role) AS role_count, movies.name 
FROM actors
INNER JOIN roles ON actors.id = roles.actor_id
INNER JOIN movies ON roles.movie_id = movies.id
WHERE movies.year > 1900
GROUP BY roles.actor_id, roles.movie_id
HAVING role_count >= 5
ORDER BY movies.name ASC;
```

## 13. ♀
``` sql
SELECT m.year, COUNT(1) as femaleOnlyMovies
FROM movies m
WHERE NOT EXISTS
(
SELECT 1 FROM roles r
INNER JOIN actors a ON a.id = r.actor_id
WHERE r.movie_id = m.id
AND a.gender = 'M'
)
GROUP BY m.year;
```
