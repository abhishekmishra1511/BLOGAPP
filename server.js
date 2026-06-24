const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
// Create an instance for express 
const app =   express()
// to use express data in json format
app.use(express.json())
//  To establish the MONGODb caonnection
mongoose.connect(process.env.MONGO_URI)
.catch(err=>console.error(err))

// app.get('/',(req,res)=>{
    // res.send("Hello ")
// })
// create new schema for define the input data and type
const blogSchema = new mongoose.Schema( 
    {
        title: {type: String,required:true},
        author:{type: String,required:true},
        content:{type:String,required:true}

    }
    
)

// create model for schema
const Blog = mongoose.model("blog",blogSchema)
// apply crud operation on blog app 
// add blog using POST method
app.post('/',async(req,res)=>{
    console.log("Request body ",req.body)
    try {
        const myBlog = await Blog.create(req.body)
        res.status(201).json(myBlog)
        
    } catch (error) {
        res.status(400).json({err:error.message})
        
    }
})
// to get all blogs from mongo using express
 app.get('/',async (req,res)=>{
     const allBlogs = await Blog.find()
     res.json(allBlogs)


}) 
 app.get('/:id',async (req,res)=>{
    try {
    const BACKEND = await Blog.findById(req.params.id)
    res.json(BACKEND)
        
    } catch (error) {
        console.error("Error is ", error.message)
        
    }
     
})
// delete blog by id
app.delete('/:id',async (req,res)=>{
    await Blog.findByIdAndDelete(req.params.id)
    res.json({msg:"blog deleted"})
})
// update blog by id
app.put('/:id',async (req,res)=>{
    const updateBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
  res.json(updateBlog)
})

// to run the application on port
app.listen(process.env.PORT,()=>{
    console.log("server running")
})