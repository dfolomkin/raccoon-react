import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import serverless from 'serverless-http'

const __dirname =
  import.meta.dirname || path.join(process.cwd(), 'netlify/functions')

const app = express()
const port = process.env.BE_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname))

// NOTE: primary for req.body (Content-Type: multipart/form-data) parsing
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

let db = {
  articles: [],
  tags: [],
}
const dbPath = path.join(__dirname, 'db.json')

try {
  if (fs.existsSync(dbPath)) {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'))

    db = { ...db, ...dbData }
  }
} catch (error) {
  console.log('No existing db.json found, starting with empty database')
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/api/:resource', (req, res) => {
  const { resource } = req.params

  if (db[resource]) {
    res.json(db[resource])
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

app.get('/api/:resource/:id', (req, res) => {
  const { resource, id } = req.params

  if (db[resource]) {
    const item = db[resource].find((item) => item.id == id)

    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

app.post('/api/:resource', upload.any(), (req, res) => {
  const { resource } = req.params

  if (!db[resource]) {
    db[resource] = []
  }

  let id = db.stats?.lastId || 0
  const data = {
    id: ++id,
    author: req.body.author || '',
    title: req.body.title || '',
    content: req.body.content || '',
    date: Date.now(),
    tags: req.body.tags?.split(', ') || [],
    socials: {
      facebook: 0,
      gplus: 0,
      twitter: 0,
      vk: 0,
      yaru: 0,
    },
  }

  db[resource].push(data)

  res.status(201).json(data)
})

app.put('/api/:resource/:id', upload.any(), (req, res) => {
  const { resource, id } = req.params

  if (!db[resource]) {
    return res.status(404).json({ error: 'Resource not found' })
  }

  const itemIndex = db[resource].findIndex((item) => item.id == id)

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  const data = {
    author: req.body.author || '',
    title: req.body.title || '',
    content: req.body.content || '',
    date: Date.now(),
    tags: req.body.tags?.split(', ') || [],
  }

  db[resource][itemIndex] = {
    ...db[resource][itemIndex],
    ...data,
  }

  res.json(db[resource][itemIndex])
})

app.delete('/api/:resource/:id', (req, res) => {
  const { resource, id } = req.params

  if (!db[resource]) {
    return res.status(404).json({ error: 'Resource not found' })
  }

  const itemIndex = db[resource].findIndex((item) => item.id == id)

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  const deletedItem = db[resource].splice(itemIndex, 1)[0]

  res.json(deletedItem)
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
  console.log(`Express JSON Server is running on port ${port}`)
  console.log(`Upload directory: ${path.join(__dirname, 'uploads')}`)
})

export const handler = serverless(app)
