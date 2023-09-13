import express from 'express'
import mongoose from 'mongoose'
const app = express()
import 'dotenv/config'
import { Book } from './bookModel.js'
import cors from 'cors'

//Middlewares
app.use(express.json())
app.use(cors())


app.get("/",(request,response) =>{
    return response.status(234).send('Welcome to mern stack tutorial')
})

//Routeri per new Book
app.post("/books",async (request,response) =>{
    try {
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ){
           return response.status(500).send({message:error.message})

        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook)
        return response.status(201).send(book)

    } catch (error) {
        console.log(error) 
        response.status(400).send({message:"Send all required fields:title,author,publishyear"})
    }

})

//get All books
app.get("/books", async (request,response) =>{
try {
const books = await Book.find({})
return response.status(200).json({
count:books.length,
data:books
})

} catch (error){ 
console.log(error.message)
response.status(400).send({message:error.message})
}
})

//Route for Get One Book from database by id
app.get("/books/:id", async (request,response) =>{
    try {
        const {id} = request.params
    const book = await Book.findById(id)
    return response.status(200).json(book)
    
    } catch (error){ 
    console.log(error.message)
    response.status(400).send({message:error.message})
    }
    })

    app.put("/books/:id", async (request,response) =>{
        try {
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ){
            return response.status(400).send({message:"send all required fields title author and publishyear"})
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result) {
            return response.status(404).json({message:"Book and found"})
        }
        } catch (error){
         console.log(error.message)
            response.status(400).send({message:error.message})
        }
        })
    
   app.delete("/books/:id",async (request,response) =>{
try {
    const {id} = request.params
    const result = await Book.findByIdAndDelete(id)
    if(!result) {
        return response.status(404).json({message:"Book and found"})
    }
    return response.status(200).json({message:"Fshirja me sukses"})
} catch (error){
    console.log(error.message)
    response.status(400).send({message:error.message})
}
   })
    


mongoose.connect(process.env.DATABASE_URL)
.then(() =>{
console.log("App connected to database")
})
.catch((error) =>{
    console.log(error)
})


app.listen(process.env.PORT, () =>{
    console.log("Serveri eshte startuar ne process.env.PORT",process.env.PORT)
     })
