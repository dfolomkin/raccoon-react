const jsonServer = require('json-server');
const multer = require('multer');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// const store = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })
// const upload = multer({ storage: store })

// server.post('/api/upload', upload.any(), (req, res) => {
//   console.log(`>>> Upload ${req.files}`)
//   res.status(200)
// })

const router = jsonServer.router('./db.json');

server.use('/api', router);

const port = 3000;

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
