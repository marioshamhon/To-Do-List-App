import { Router } from "express";

const todoRouter = Router()

todoRouter.get('/', (req,res) => {
    /* 
            1. Get all notes from database for a spefic userID
            2. Send them back in the response to the frontend 
    */
})

todoRouter.post('/', (req,res) => {
    /* 
            1. Destucture the note from the req
            2. Decode the userId from the jwtToken
            3. pass all these variables so mongoose can create a new note in the notes collection
    */
})

todoRouter.put('/:id', (req,res) => {
    /* 
            1. Destucture the updated note, and noteID from the req
            2. pass all these variables so mongoose can update a note in the notes collection
    */
    })

todoRouter.delete('/:id', (req,res) => {
    /* 
            1. Destucture the noteID from the req
            2. pass the noteID so mongoose can delete a note in the notes collection
    */
    })

export default todoRouter
