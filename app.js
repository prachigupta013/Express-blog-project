const express = require('express')
const connectDB = require('./db/connect_db')
const app = express()
const port = 2616
var session = require('express-session')
var flash = require( 'connect-flash' )
const router = require( './routes/web' )

const bodyParser = require( 'body-parser' )
const fileUpload = require( "express-fileupload" );
const cloudinary = require( 'cloudinary' )
const cookieParser = require( 'cookie-parser' )

app.use(cookieParser())


// express-fileUpload 
app.use( fileUpload( { useTempFiles: true } ) );

// mongodb connection 
connectDB()

//setup EJS
app.set('view engine','ejs')

//static files path 
app.use( express.static( 'public' ) )

// body-parser 
app.use( express.urlencoded( { extended: false } ) )
//router.use(bodyParser.urlencoded({extended:false}))

// express-session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
}));
  
app.use( flash() );
  
//router connection
app.use('/',router)








// server create
app.listen(port, () => {
    console.log(`Server is running  localhost : ${ port }`)
} )

// Entry Point File