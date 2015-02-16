## 1. Car
``` sql
select * from movies where name like 'Car %';
```

## 2. Birthyear
``` sql
select * from movies where year=1985;
```

## 3. 1982
``` sql
select count(*) as count from movies where year=1982;
```

## 4. Stacktors
``` sql
select * from actors where last_name like '%stack%';
```

## 5. Fame Name Game
``` sql
select count(*), first_name from actors group by first_name order by count(*) desc limit 10;

select count(*), last_name from actors group by last_name order by count(*) desc limit 10;
```

## 6. Prolific
``` sql
select actors.first_name, actors.last_name, count(*) from actors join roles on actors.id = roles.actor_id group by roles.actor_id order by count(*) desc limit 100;
```

## 7. Bottom of the Barrel
``` sql
select genre, count(*) as num_movies from movies_genres group by genre order by num_movies asc;
```

## 8. Braveheart
``` sql
select actors.id, actors.first_name, actors.last_name from actors join roles on actors.id = roles.actor_id join movies on roles.movie_id = movies.id and movies.name="Braveheart" and movies.year=1995;
```

## 9. Leap Noir
``` sql
select directors.first_name, directors.last_name, movies.name, movies.year from directors join movies_directors on directors.id = movies_directors.director_id join movies_genres on movies_directors.movie_id = movies_genres.movie_id join movies on movies.id = movies_genres.movie_id where movies_genres.genre = 'Film-Noir' and movies.year % 4 = 0;
```

## 10. Bacon (Error!)
``` sql
select movies.name, actors.first_name, actors.last_name from actors join roles on actors.id = roles.actor_id join movies on roles.movie_id = movies.id join movies_genres on movies.id = movies_genres.movie_id where actors.first_name = 'Kevin' and actors.last_name = 'Bacon' and movies_genres.genre = 'Drama';
```

## 11. Immortal Actors
``` sql
```


## 12. Busy Filming
``` sql
```

## 13. ♀
``` sql
```
