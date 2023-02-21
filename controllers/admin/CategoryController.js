const cloudinary = require('cloudinary').v2;
const CategoryModel = require( '../../models/Category' )

cloudinary.config({ 
  cloud_name: 'dbfph5krr', 
  api_key: '776869699764881', 
  api_secret: 'A1zyy2-8Q1WFd4NbFJpsd9GaQ2s',
});

class CategoryController{
    static categorydisplay = async( req, res ) =>{
        const data = await CategoryModel.find()
        res.render('admin/category/categorydisplay',{d:data})
    }
    static categoryinsert = async ( req, res ) =>{
        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload( file.tempFilePath, {
            folder: "category_image"
        });
        try{
            const result = new CategoryModel( {
                category_name: req.body.category_name,
                image:{
                    public_id: myimage.public_id,
                    url:myimage.secure_url,
                },
            } );
            await result.save()
            // only show url of route in redirect
            res.redirect( '/admin/categorydisplay' )
        } catch ( err ){
            console.log( err )
        }
    }
    static categoryview = async ( req, res ) =>{
        //console.log(req.params.id)
        try{
            const result = await CategoryModel.findById( req.params.id )
            // console.log(result)
            res.render( 'admin/category/categoryview', { categoryview: result } )
        } catch ( err ){
            console.log( err )
        }
    }
    static categoryedit = async ( req, res ) =>{
        //console.log( req.params.id )
        try{
            const result = await CategoryModel.findById( req.params.id );
            res.render( "admin/category/categoryedit", { categoryedit: result } );
        } catch ( err ){
            console.log( err );
        }
    };
    static categoryupdate = async ( req, res ) =>
    {
        try{
            const categorydata = await CategoryModel.findById(req.params.id)
            //console.log(blogdata)
            const imageid = categorydata.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy( imageid )
            //image update code
            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: "category_image",
            });
            const result = await CategoryModel.findByIdAndUpdate( req.params.id,{
                category_name: req.body.category_name,
                image: {
                    public_id: myimage.public_id,
                    url:myimage.secure_url,
                },
            } );
            await result.save();
            res.redirect("/admin/categorydisplay")
        } catch ( err ){
            console.log( err );
        }
    }
    static categorydelete = async ( req, res ) =>{
        try
        {
            const categorydata = await CategoryModel.findById(req.params.id)
            //console.log(blogdata)
            const imageid = categorydata.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            //console.log(req.params.id)
            const result = await CategoryModel.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.redirect( "/admin/categorydisplay" )
        } catch ( err ){
            console.log( err );
        }
    }
}

module.exports = CategoryController
