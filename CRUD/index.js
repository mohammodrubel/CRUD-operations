const { MongoClient } = require('mongodb');
const express = require ('express')
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
// midddleware
app.use(cors())
app.use(express.json())

// user:Userauthentication
// password:jAaUSpoAGC71I25S

const uri = "mongodb+srv://Userauthentication:jAaUSpoAGC71I25S@cluster0.i8wrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    async function run (){
        try{
            await client.connect()
            const database =client.db('moreInformation')
            const userCollection = database.collection('users')
            // GET API 
            app.get('/users',async (req,res)=>{
                const cursor = userCollection.find({})
                const users = await cursor.toArray()
                res.send(users)
            })

            // SINGLE ID FOR UPDATE 
            app.get('/users/:id',async (req,res)=>{
                const id = req.params.id
                console.log('this is id',id)
                const query = {_id: ObjectId(id)}
                const user =await userCollection.findOne(query)
                res.send(user)

            })
          
            // POST API 
            app.post('/users',async(req,res)=>{
                const newUser = req.body;
                const result =await userCollection.insertOne(newUser)
                console.log('got a new user',(req.body))
                console.log('added user',result)
                res.send(result)
            })

            //UPDATE API
            app.put('/users/:id',async(req,res)=>{
                const id = req.params.id
                const UpdateUser = req.body
                const filter = {_id:ObjectId(id)}
                const options = {upsert:true} //optional
                const updateDoc = {
                   $set:{
                    name:UpdateUser.name,
                    email:UpdateUser.email
                   }
                }
                const result = await userCollection.updateOne(filter,updateDoc,options)
                console.log('updateting users ',id)
                res.json(result)
                console.log(req.params.id)

                
            })

            //DELETE API
            app.delete('/users/:id',async(req,res)=>{
                const id = req.params.id
                const query = {_id:ObjectId(id)}
                const result = await userCollection.deleteOne(query)
                console.log('deleting data from database',result)
                res.json(result)

            })

        }
        finally{
            // await client.close()
        }
    }

    run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('Runing on CRUD server')
})

app.listen(port, ()=>{
    console.log('running server port',port)
})