import app from './src/app.js'
import dotenv from 'dotenv'
dotenv.config()

import Connectdatabase from './src/config/database.js'
Connectdatabase()

app.listen(3000,()=>{
    console.log("server is runnig ")
})

