#Ajax
#CORS request
#JSONP
#Trip Planner Persistence
#Trip Planner Persistence Review
* RESTful
  * [Representational State Transfer (REST) is an architectural style that specifies constraints, such as the uniform interface, that if applied to a web service induce desirable properties, such as performance, scalability, and modifiability, that enable services to work best on the Web.](http://docs.oracle.com/javaee/6/tutorial/doc/gijqy.html)
  * RESTful Patterns
  * ```$addDay.on('click', function() {
        var newDay = {
          number:days.length + 1  
        }

        $.post('/days', newDay, function(day) {
          days.push(day);
          ...  
        })
    })```
  * ```
      dayRouter.post('/', function(req, res, next){
        Day.create(req.body, function(err, day){
          if (err) next(err);
          res.json(day);
        });
      });```
    * err object
    * body-parser use json
    * 'create' create and save the document
    * difference between res.json and res.send, for api use json
  * put body-parser before routes in app.js
  * Day.find().exec(function(){...})
  * ```(function loadDays () {
      $.get('/days', function() {
          days.forEach(addDay);
        }).fail(function(){
          console.log('could not add day');  
        });
    })();```
  * .populate, reference vs embed - performance
