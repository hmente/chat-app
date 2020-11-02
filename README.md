# chat-app
REST + Sockets-based chat service built on top of NodeJS/ExpressJS using MongoDB. API security using JWT is the topic that I used on my work project. Therefore, I tried to use that topic here, on the chatting part.

## 1. System Manual

### 1.1 Requirements
* NodeJS 
* NPM
* MongoDB

### 1.2 Run the project
1. Run the following command to start the backend server: ```npm start```
2. Access the backend server on http://localhost:3000


## 2. Endpoint Documentation
### <a name='register'></a> registeration

<p>This endpoint takes a request body and saves it to the database</p>

```
POST  http://localhost:3000/users
```

#### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| firstName | `String` |  |
| lastName | `String` |  |
| type | `String` |  |


#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | `String` |  |
| createdAt | `Datetime` |  |
| updatedAt | `Datetime` |  |

### <a name='userOperations'></a> User Operation

<p>This endpoint returns all users in the database</p>

```
GET  http://localhost:3000/users
```

#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| users | `JSONArray` |  |


### <a name='loginToSystem'></a> Login  to system

<p>This endpoint takes a userId as a parameter and returns a jwt token to authenticate chatting</p>

```
Post  http://localhost:3000/login/:userId
```

#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| authorization | `UUID` |  |

### <a name='initiateChat'></a> Initiate chat

<p>This endpoint takes a a request body and saves it to the database</p>

```
Post  http://localhost:3000/room/initiate
```

#### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| userIds | `Array` |  |
| type | `String` |  |

#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| chatRoom | `Object` |  |
| chatRoom.isNew | `Boolean` |  |
| chatRoom.chatRoomId | `String` |  |
| chatRoom.type| `String` |  |


### <a name='sendMessage'></a> Send Message

<p>This endpoint takes a a request body and saves it to the database</p>

```
Post  http://localhost:3000/room/initiate
```

#### Request body(JSON) Parameters
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| messageText | `String` |  |

#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| post | `Object` |  |
| post.userId | `Boolean` |  |
| post.chatRoomId | `String` |  |
| post.postId| `String` |  |
| post.message| `String` |  |
| post.type| `String` |  |
| post.postedByUser| `Object` |  |
| post.chatRoomInfo| `Object` |  |
| createdAt| `Datetime` |  |
| updatedAt| `Datetime` |  |

### <a name='seeMessage'></a> See a message

<p>This endpoint takes chatRoomdId, limit and page for pagination and returns the messages as the old one at the top</p>

```
http://localhost:3000/room/chatRoomId?limit=?&page=
```

#### Success 200
| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| conservation | `JSONArray` |  |
