## 1. Car
``` sql
SELECT * 
FROM movies 
WHERE name LIKE 'Car %';
```

## 2. Birthyear
``` sql
SELECT * 
FROM movies 
WHERE year=1985;
```

## 3. 1982
``` sql
SELECT COUNT(*) AS count 
FROM movies 
WHERE year=1982;
```

## 4. Stacktors
``` sql
SELECT * 
FROM actors 
WHERE last_name LIKE '%stack%';
```

## 5. Fame Name Game
``` sql
SELECT COUNT(*) AS first_name_count, first_name 
FROM actors
WHERE gender = "M" 
GROUP BY first_name 
ORDER BY first_name_count DESC 
LIMIT 10;

SELECT COUNT(*) AS last_name_count, last_name 
FROM actors 
WHERE gender = "M"
GROUP BY last_name 
ORDER BY last_name_count DESC 
LIMIT 10;
```

## 6. Prolific
``` sql
SELECT actors.first_name, actors.last_name, COUNT(*) 
FROM actors 
JOIN roles ON actors.id = roles.actor_id 
GROUP BY roles.actor_id 
ORDER BY COUNT(*) DESC 
LIMIT 100;

SELECT actors.first_name, actors.last_name, COUNT(*)
FROM roles, actors
WHERE roles.actor_id = actors.id
GROUP BY actors.id
ORDER BY role_count
LIMIT 100
```

## 7. Bottom of the Barrel
``` sql
SELECT genre, COUNT(*) AS num_movies 
FROM movies_genres 
WHERE movie_id != ""
GROUP BY genre 
ORDER BY num_movies asc;

SELECT genre, COUNT(*)
FROM movies INNER JOIN movies_genres 
      ON movies.id = movies_genres.movie_id
GROUP BY genre
ORDER BY COUNT(*) ASC;

SELECT genre, COUNT(movie_id) as movie_count
FROM movies_genres
WHERE movie_id != ""
GROUP BY genre
ORDER BY movie_count;
```

## 8. Braveheart
``` sql
SELECT actors.id, actors.first_name, actors.last_name 
FROM actors 
JOIN roles ON actors.id = roles.actor_id 
JOIN movies ON roles.movie_id = movies.id 
WHERE movies.name="Braveheart" 
AND movies.year=1995;
```

## 9. Leap Noir
``` sql
SELECT directors.first_name, directors.last_name, movies.name, movies.year FROM directors 
JOIN movies_directors ON directors.id = movies_directors.director_id 
JOIN movies_genres ON movies_directors.movie_id = movies_genres.movie_id 
JOIN movies ON movies.id = movies_genres.movie_id 
WHERE movies_genres.genre = 'Film-Noir' AND movies.year % 4 = 0;

SELECT first_name, last_name, movies.name, movies.year 
FROM directors, movies_directors, movies, movies_genres
WHERE directors.id = movies_directors.director_id
    AND movies_directors.movie_id = movies.id
    AND movies.id = movies_genres.movie_id
    AND genre = 'Film-Noir' 
    AND year % 4 = 0;
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

SELECT movies.name, actors.first_name, actors.last_name
FROM 
    actors JOIN roles ON actors.id = roles.actor_id 
    JOIN movies ON roles.movie_id = movies.id 
    JOIN movies_genres ON movies.id = movies_genres.movie_id
WHERE movies_genres.genre = 'Drama' 
      AND movies.id IN (
        SELECT movies.id FROM movies JOIN roles 
                              ON movies.id = roles.movie_id
                              JOIN actors ON roles.actor_id = actors.id
        WHERE actors.first_name = 'Kevin' AND actors.last_name = 'Bacon'
      )
LIMIT 100;

SELECT bacon_names, first_name, last_name
FROM 
 (SELECT movies.id AS bacon_id, movies.name AS bacon_names FROM actors 
 INNER JOIN roles ON actors.id = roles.actor_id 
 INNER JOIN movies ON roles.movie_id = movies.id
 INNER JOIN movies_genres ON movies_genres.movie_id = movies.id
 WHERE genre = 'Drama' AND first_name = 'Kevin'
 AND last_name = 'Bacon')
INNER JOIN roles ON bacon_id = roles.movie_id
INNER JOIN actors ON actors.id = roles.actor_id
LIMIT 100;

SELECT m.name, a2.first_name, a2.last_name
FROM actors a, roles r, movies m, movies_genres mg, roles r2, actors a2
WHERE
  a.first_name = "Kevin" AND a.last_name = "Bacon" AND
  a.id = r.actor_id AND
  r.movie_id = m.id AND
  m.id = mg.movie_id AND
  mg.genre = "Drama" AND
  m.id = r2.movie_id AND
  r2.actor_id = a2.id AND
  a2.id != a.id
LIMIT 100;
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

select a.first_name, a.last_name, a.id, count(a.id) as c from (
     select first_name, last_name, actors.id from actors
       inner join roles on actors.id = roles.actor_id
       inner join movies on roles.movie_id = movies.id
       where movies.year < 1900 AND movies.year > 1850
   ) as a, (
     select first_name, last_name, actors.id from actors
       inner join roles on actors.id = roles.actor_id
       inner join movies on roles.movie_id = movies.id
       where movies.year > 2000
   ) as b
   where a.id = b.id
   group by a.first_name, a.last_name, a.id
   order by c desc;


   SELECT a.first_name, a.last_name, a.id
   FROM actors a
   WHERE EXISTS (SELECT 1 FROM roles, movies
       WHERE movies.id = roles.movie_id 
       AND roles.actor_id = a.id
       AND movies.year > 2000) AND 
       EXISTS (SELECT 1 FROM roles, movies
           WHERE movies.id = roles.movie_id 
           AND roles.actor_id = a.id
           AND movies.year < 1900)
       ORDER BY a.id;
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
