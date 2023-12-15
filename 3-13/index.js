import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Persons } from './src/models/persons.js'
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body));
app.use(morgan(':method :url :status :response-time ms :body'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(persons => {
    response.json(persons)
})})

app.get('/info', (request, response) => {
    let d = new Date().toISOString();
    response.send(`<div>Phonebook has info for ${persons.length} people</div><br/><div>${d}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
return maxId + 1
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

if (!body.name) {
    return response.status(400).json({ 
    error: 'Name is missing' 
    })
}

if (!body.number) {
    return response.status(400).json({ 
    error: 'Number is missing' 
    })
}

if (persons.map(person => person.name).includes(body.name)) {
    return response.status(400).json({ 
    error: 'Name must be unique' 
    })
}

const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
}

persons = persons.concat(person)
response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})