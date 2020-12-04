# Askii  
Question asking system.
## Stack  
Node.js  
Express  
MongoDB    
Redis
## Software Architecture  
Modular monolith  
RESTful API  
Auth-- Layered arch.  
Stateless. JWT accesss token and refesh token.
API-- Layered arch. 

## Database
![DB](https://ibb.co/W2YnDkV)  
### Version 1.0.0
-- AUTH  
*As a user I can log-in  
*As a user I can refresh tokens  
*As a user I can log-out  
*As a user I can create a new account    
-- API  
Questions  
*As a user I can ask a question (also anonymously).  
*As a user I can see all the question I asked.  
*As a user I can delete a question.  
Answers  
*As a user I can see all the answers to a question I asked.   
*As a user I can see all the answers I answered.  
*As a user I can answer once a question (also anonymously).   
*As a user I can delete an answer.
Next version(1.1.0)
As a user I can edit a question.
As a user I can edit an answer.
More
#### API
-- AUTH
POST /auth/log-in  
POST /auth/refresh-token  
POST /auth/logout  
POST /auth/sing-up  
-- API 
POST /api/v1/question
POST /api/v1/answer
DELETE /api/v1/question/{question-id}
DELETE /api/v1/answer/{answer-id}
GET /api/v1/answers/question/{question-id}
GET /api/v1/questions
GET /api/v1/answers


