import jsonServer from 'json-server'
import multer from 'multer'
import path from 'path'

const __dirname = import.meta.dirname

const server = jsonServer.create()
const middlewares = jsonServer.defaults({
  static: __dirname,
  bodyParser: true,
})
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))
const port = process.env.BE_PORT

server.use(middlewares)

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
})

server.put('/api/articles/:id', upload.any(), (req, res) => {
  try {
    const articleRecord = router.db
      .get('articles')
      .find({ id: Number(req.params.id) })

    if (articleRecord) {
      const data = { ...req.body }

      data.date = Date.now()
      data.tags = data.tags.split(', ')
      const updatedArticleRecord = articleRecord.assign(data).write()

      res.json({
        data: updatedArticleRecord,
      })
    } else {
      res.json({
        error: 'LogicError: There is no such id',
      })
    }
  } catch (error) {
    // NOTE: json-server send 500 error (e.g. ReferenceError) by default but we want to handle this to prettify output
    res.status(500).json({
      error: error.toString(),
    })
  }
})

server.post('/api/articles', upload.any(), (req, res) => {
  try {
    const data = { ...req.body }
    let id = router.db.get('stats').get('lastId').value()

    data.id = ++id
    data.date = Date.now()
    data.tags = data.tags.split(', ')
    data.socials = {
      facebook: 0,
      gplus: 0,
      twitter: 0,
      vk: 0,
      yaru: 0,
    }

    router.db.get('articles').push(data).write()
    router.db.get('stats').assign({ lastId: id }).write()

    const records = router.db.get('articles').value()
    const createdArticleRecord = records[records.length - 1]

    res.json({
      data: createdArticleRecord,
    })
  } catch (error) {
    // NOTE: json-server send 500 error (e.g. ReferenceError) by default but we want to handle this to prettify output
    res.status(500).json({
      error: error.toString(),
    })
  }
})

server.use('/api', router)

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running on port', port)
})
