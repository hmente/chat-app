import express from 'express';
// controllers
import chatRoom from '../controllers/chatRoom.js';

const router = express.Router();

router
  .get('/:roomId', chatRoom.getConversationByRoomId)
  .post('/initiate', chatRoom.initiate)
  .post('/:roomId/message', chatRoom.postMessage)


export default router;
