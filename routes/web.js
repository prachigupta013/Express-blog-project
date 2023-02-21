const express = require( 'express' )
const router = express.Router()

const AdminController=require('../controllers/admin/AdminController')
const BlogController = require( '../controllers/admin/BlogController' )
const { blogdisplay }=require('../controllers/admin/BlogController')
const CategoryController = require( '../controllers/admin/CategoryController' )
const ContactController = require( '../controllers/admin/ContactController' )
const AboutController = require( '../controllers/admin/AboutController' )
const FrontController = require( '../controllers/FrontController' )
const { about } = require( '../controllers/FrontController' )
const {contact} =require('../controllers/FrontController')
const admin_auth = require('../middleware/auth')

//Route
// FrontController route
router.get( '/', FrontController.home )
router.get( '/about', FrontController.about )
router.get( '/contact', FrontController.contact )
router.get( '/blog', FrontController.blog )
router.get( '/login', FrontController.login )
router.get('/register',FrontController.adminregister)
router.get( '/blogdetail/:id', FrontController.blogdetail )
router.post( '/adminregister', FrontController.admininsert )
router.post( '/verify_login', FrontController.verify_login )
router.get('/logout',FrontController.logout)

// AdminController routes
router.get('/admin/dashboard',admin_auth,AdminController.Dashboard)

// BlogController routes 
router.get( '/admin/blogdisplay',admin_auth, BlogController.blogdisplay )
router.post( '/bloginsert',admin_auth, BlogController.bloginsert )
router.get('/admin/blogview/:id',admin_auth,BlogController.blogview)
router.get( '/admin/blogedit/:id',admin_auth, BlogController.blogedit )
router.post('/blogupdate/:id',admin_auth,BlogController.blogupdate)
router.get('/admin/blogdelete/:id',admin_auth,BlogController.blogdelete)

// CategoryController routes 
router.get( '/admin/categorydisplay',admin_auth, CategoryController.categorydisplay )
router.post( '/categoryinsert',admin_auth, CategoryController.categoryinsert )
router.get('/admin/categoryview/:id',admin_auth,CategoryController.categoryview)
router.get( '/admin/categoryedit/:id',admin_auth, CategoryController.categoryedit )
router.post('/categoryupdate/:id',admin_auth,CategoryController.categoryupdate)
router.get('/admin/categorydelete/:id',admin_auth,CategoryController.categorydelete)

// ContactController routes 
router.get( '/admin/contactdisplay',admin_auth, ContactController.contactdisplay )
router.post( '/contactinsert',admin_auth,ContactController.contactinsert )
router.get('/admin/contactview/:id',admin_auth,ContactController.contactview)
router.get( '/admin/contactedit/:id',admin_auth,ContactController.contactedit )
router.post('/contactupdate/:id',admin_auth,ContactController.contactupdate)
router.get( '/admin/contactdelete/:id',admin_auth, ContactController.contactdelete )

// AboutController routes 
router.get( '/admin/aboutdisplay',admin_auth, AboutController.aboutdisplay )
router.post( '/aboutinsert',admin_auth, AboutController.aboutinsert )
router.get('/admin/aboutview/:id',admin_auth,AboutController.aboutview)
router.get( '/admin/aboutedit/:id',admin_auth, AboutController.aboutedit )
router.post('/aboutupdate/:id',admin_auth,AboutController.aboutupdate)
router.get('/admin/aboutdelete/:id',admin_auth,AboutController.aboutdelete)


module.exports=router