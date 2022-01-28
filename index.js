const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())

// username : ruhul
// password :gmw2sqQIgbrVv9uU

const uri = "mongodb+srv://ruhul:gmw2sqQIgbrVv9uU@cluster0.6jlv6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("e-commerce");
        const usersCollection = database.collection("users");

        
        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser)
            console.log('got new user', newUser)
            console.log('send new user', result)
            res.json(result)
        })

        // GET API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })

        // GET API FIND DATA
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query)
            console.log('find data', user)
            res.send(user)
        })


        // DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            console.log('deleting user', result)
            res.json(result)
        })
 


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello i am from node mongo server')
})

app.listen(port, () => {
    console.log('server running on port', port)
})