const BlogModel = require( '../models/Blog' )
const CategoryModel = require( '../models/Category' )
const ContactModel = require( '../models/Contact' )
const AboutModel = require( '../models/About' )
const AdminModel = require( '../models/Admin' )
const bcrypt = require( 'bcrypt' )
const jwt=require('jsonwebtoken')


class FrontController
{
    static home = async ( req, res ) =>
    {
        const data = await BlogModel.find().sort( { _id: -1 } ).limit( 6 )
        //console.log(data)
        res.render( 'home', { d: data } )
    }
    static about = async ( req, res ) =>
    {
        const aboutdata = await AboutModel.find()
        res.render( 'about', { ad: aboutdata } )
    }
    static contact = async ( req, res ) =>
    {
        const contactdata = await ContactModel.find()
        //console.log( contactdata )
        res.render( 'contact', { cd: contactdata } )
        //res.render('contact')
    }
    static blog = async ( req, res ) =>
    {
        const blog_list = await BlogModel.find().sort({_id:-1})
        //console.log(blog_list)
        res.render( 'blog', { bl: blog_list } )
    }

    static blogdetail = async ( req, res ) =>
    {
        try
        {
            const category = await CategoryModel.find().sort( { _id: -1 } ).limit( 6 )
            const recentblog = await BlogModel.find().sort( { _id: -1 } ).limit( 6 )
            const result = await BlogModel.findById( req.params.id )
            console.log( result )
            res.render( 'blogdetail', { r: result, recentblog: recentblog, category: category } )
        } catch ( err )
        {
            console.log( err )
        }
    }
    // user login and registration
    static login = ( req, res ) =>
    {
        res.render( 'login', {message: req.flash( "success" ),message1: req.flash( "error" )})
    }
    static adminregister = async ( req, res ) =>
    {
        res.render( 'register', { message: req.flash( 'error' ) } )
    }
    static admininsert = async ( req, res ) =>
    {
        try
        {
            const { name, email, password, confirmpassword } = req.body
            const admin = await AdminModel.findOne( { email: email } )
            //console.log(admin)
            if ( admin )
            {
                req.flash( 'error', 'email already exist' )
                res.redirect( '/register' )
            }
            else
            {
                if ( name && email && password && confirmpassword )
                {
                    if ( password == confirmpassword )
                    {
                        try
                        {
                            const hashpassword = await bcrypt.hash( password, 10 )
                            const result = await AdminModel( {
                                name: name,
                                email: email,
                                password: hashpassword,
                            } )
                            await result.save();
                            req.flash( 'success', 'Registration successfully,Please login' );
                            res.redirect( '/login' );
                        } catch ( err )
                        {
                            console.log( err )
                        }

                    } else
                    {
                        req.flash( 'error', 'Password and Confirmpassword does not match' )
                        res.redirect( '/register' )
                    }
                } else
                {
                    req.flash( 'error', 'All field are required' )
                    res.redirect( '/register' )
                }
            }

        } catch ( err )
        {
            console.log( err )
        }
    }
    static verify_login = async ( req, res ) =>
    {
        try
        {
            //console.log(req.body)
            const { email, password } = req.body
            if ( email && password )
            {
                const admin = await AdminModel.findOne( { email: email } )
                if ( admin != null )
                {
                    const ismatched = await bcrypt.compare( password, admin.password )
                    if ( ismatched )
                    {
                        //token generate
                        const token = jwt.sign( { id: admin._id }, 'teddybear' );
                                                                    //^secret key
                        //console.log(token)
                        res.cookie('token',token)
                        res.redirect( "/admin/dashboard" )

                    }
                    else
                    {
                        req.flash( "error", " email or password doesnot matched" );
                        res.redirect( "/login" );
                    }
                }
                else
                {
                    req.flash( "error", "  You are not registered" );
                    res.redirect( "/login" );
                }

            }
            else
            {
                req.flash( "error", "All Field are required" );
                res.redirect( "/login" );
            }
        }
        catch ( err )
        {
            console.log( err )
        }
    }
    static logout = async ( req, res ) =>
    {
        try
        {
            res.clearCookie('token')
            res.redirect('/login')
        } catch ( err )
        {
            console.log(err)
        }
    }

}
    


module.exports = FrontController

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWI0ZTc2NDgzZmU1NjdiZWMxYTRiNSIsImlhdCI6MTY3NjM2NTQ1MX0.L5TTGX-h3ldFxCdYZQU4pN5DTJl6Ae5u0RqjaKfmsjk
