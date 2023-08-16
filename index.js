import { Server } from 'socket.io';
import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/documentController.js';

Connection();

const Port = process.env.PORT || 9000;

const io = new Server(Port, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    console.log('DocID', documentId);
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);
    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });
    socket.on('save-document', async (data) => {
      await updateDocument(documentId, data);
    });
  });
});
