#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d '{"id" : "1" , "title": "test1", "description" : "testing", "category" : "test", "priority":"high" , "completed": "false" }' http://localhost:3000/tasks/
curl -X POST -H "Content-Type: application/json" -d '{"id" : "2" , "title": "test2", "description" : "testing", "category" : "test", "priority":"high" , "completed": "false" }' http://localhost:3000/tasks/
# curl -X POST -H "Content-Type: application/json" -d '{"id" : "3" , "title": "test3", "description" : "testing of script changing the description", "priority":"high" , "completed": "false" }' http://localhost:3000/tasks/
# curl -X POST -H "Content-Type: application/json" -d '{"id" : "4" , "title": "test4", "description" : "testing of script changing the description" }' http://localhost:3000/tasks/
curl -X POST -H "Content-Type: application/json" -d '{"id" : "5" , "title": "test5", "description" : "testing of script changing the description", "category" : "test", "priority":"medium" , "completed": "false" }' http://localhost:3000/tasks/
# curl -X GET http://localhost:3000/tasks 
# curl -X PUT -H "Content-Type: application/json" -d '{"title": "test", "description" : "testing of script changing the description", "category" : "test", "priority":"high" , "completed": "true" }' http://localhost:3000/tasks/1
# curl -X GET http://localhost:3000/tasks/1
# curl -X PUT -H "Content-Type: application/json" -d '{"title": "test", "description" : "testing of script changing the description", "category" : "test", "priority":"high" , "completed": "true" }' http://localhost:3000/tasks/2
# curl -X PUT -H "Content-Type: application/json" -d '{"title": "test", "description" : "testing of script changing the description", "category" : "test", "priority":"high" , "completed": "true" }' http://localhost:3000/tasks/3
# curl -X GET http://localhost:3000/tasks/
# curl -X DELETE  http://localhost:3000/tasks/2
curl -X GET http://localhost:3000/tasks?sort=desc
curl -X GET http://localhost:3000/tasks/priority/low
curl -X GET http://localhost:3000/tasks?completed=true

