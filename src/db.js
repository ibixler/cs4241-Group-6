const fs = require("fs");
const env = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
/* const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`;
 */
const uri = `mongodb+srv://ibixler:${process.env.PASS}@matchinglgbt.zyq3dy3.mongodb.net/?retryWrites=true&w=majority&appName=MatchingLGBT`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

let collection = (dbName = "matching-game"),
  collectionName = "users";

exports.run = async function () {
  try{
    console.log("trying to connect");
    await client.connect();
  
    collection = await client.db(dbName).collection(collectionName);
    console.log("connecting");

  } catch (err){
    console.log(err)
  } 
};

exports.exists = () => {
  collection !== null;
};
/* exports.userExists = async function (data) {
  try {
    console.log("userexists called ");
    await client.connect();

    const database = client.db("Catabase");
    const collection = database.collection("Login");
    const query = { username: data.username };
    const items = await collection.find(query).toArray();

    if (items.length == 0) {
      await collection.insertOne(data);
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error in userExists:", error);
    return 0;
  } finally {
    client.close();
  }
};
exports.addCatDataByUsername = async function (username, data) {
  try {
    await client.connect();
    const database = client.db("Catabase");
    let collection = database.collection("Login");
    const user = await collection.findOne({ username });
    console.log("username: ", username);
    console.log("user: ", user);
    let _id;
    if (user) {
      console.log("user found with ID");
      _id = user._id;
      const filter = { uid: _id, name: data.name };
      const options = { upsert: true, new: true };
      const update = {
        $set: {
          age: data.age,
          coat: data.coat,
          solidity: data.solidity,
        },
      };
      collection = database.collection("Cats");
      data["uid"] = _id;
      await collection.updateOne(filter, update, options);
      return 1;
    }
  } catch (error) {
    console.error("Error in catdata:", error);
    return 0;
  } finally {
    client.close();
  }
};
exports.deleteCatDataByUsername = async function (username, data) {
  try {
    await client.connect();
    const database = client.db("Catabase");
    let collection = database.collection("Login");
    const user = await collection.findOne({ username });
    console.log("username: ", username);
    console.log("user: ", user);
    let _id;
    if (user) {
      console.log("user found with ID");
      _id = user._id;
      const filter = { uid: _id, name: data.name };
      const options = { upsert: true, new: true };
      const update = {
        age: data.age,
        coat: data.coat,
        solidity: data.solidity,
      };
      collection = database.collection("Cats");
      data["uid"] = _id;
      await collection.deleteOne(update);
      return 1;
    }
  } catch (error) {
    console.error("Error in catdata:", error);
    return 0;
  } finally {
    client.close();
  }
};
exports.getCatDataByUsername = async function (username) {
  try {
    await client.connect();
    const database = client.db("Catabase");
    let collection = database.collection("Login");
    const user = await collection.findOne({ username });
    console.log("username: ", username);
    console.log("user: ", user);
    let _id;
    if (user) {
      console.log("user found with ID");
      _id = user._id;
      console.log(client);
      collection = await database.collection("Cats");
      const cursor = await collection.find({ uid: _id });
      let ret = await cursor.toArray();

      console.log(ret);
      return ret;
    }
  } catch (error) {
    console.error("Error in fetchcatdata:", error);
    return 0;
  } finally {
    if (client) {
      client.close();
    }
  }
}; */
exports.getUserIdByUsername = async function (username) {
  console.log("called");
  const user = await collection.findOne({ username });
  if (user) {
    console.log("User found with ID:", user._id);
    return user._id;
  } else {
    console.log("User not found with username:", username);
    return null;
  }
};
exports.createUser = async function (data) {
  try{
    console.log("creating user");
    console.log(data)
    await collection.insertOne(data);
    
  } catch (err){
    console.log(err)
  }
}; 
/* 
async function run() {
  try {
    const database = client.db('Catabase');
    const movies = database.collection('Login');
    // Query for a movie that has the title 'Back to the Future'
    const query = { username: "ivy" };
    const movie = await movies.findOne(query);
    console.log(movie);
    // Connect the client to the server	(optional starting in v4.7)
    /* await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Catabase").command({ ping: 1 });
    var dbo = client.db("Catabase");
    var query = { username: "ivy" };
    await dbo.collection("Login").find(query).toArray(function(err, result){
      if (err) throw err;
      console.log(result);
    })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Catabase");
  var query = { username: "ivy" };
  dbo.collection("Login").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
run().catch(console.dir);
 */
/* exports.attemptLogin = async function (data) {
  try {
    await client.connect();

    const database = client.db("Catabase");
    const collection = database.collection("Login");
    const query = { username: data.username };
    const items = await collection.find(query).toArray();

    if (items.length == 0) {
      console.log("hey no users");
      return 0;
    } else {
      console.log(items);
      if (items[0].password === data.password) return 1;
      return 0;
    }
  } catch (error) {
    console.error("Error in userExists:", error);
    return 0;
  } finally {
    client.close();
  }
}; */
/* exports.uploadImage = async function (data, filename) {
  try {
    await client.connect();
    const database = client.db("Catabase");
    const bucket = new GridFSBucket(database, { bucketName: "CatPics" });

    const uploadStream = bucket.openUploadStream(filename, {
      chunkSizeBytes: 1048576,
      metadata: { userID: data.userID, filename: filename },
    });

    const readStream = fs.createReadStream("./tmp/" + filename);
    readStream.pipe(uploadStream);

    await new Promise((resolve, reject) => {
      uploadStream.on("error", reject);
      uploadStream.on("finish", resolve);
    });

    console.log("Image uploaded successfully");
    return 1;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    return 0;
  } finally {
    await client.close();
  }
}; */

/* this.uploadImage({ userID: "660edd20d2598c317470aa08" }, "test.png");
 */
