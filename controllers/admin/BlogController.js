const cloudinary = require('cloudinary').v2;
const BlogModel = require( '../../models/Blog' )

cloudinary.config({ 
  cloud_name: 'dbfph5krr', 
  api_key: '776869699764881', 
  api_secret: 'A1zyy2-8Q1WFd4NbFJpsd9GaQ2s',
});

class BlogController{
    static blogdisplay = async ( req, res ) =>{
        const data = await BlogModel.find()
        // console.log(data)
        res.render( 'admin/blog/blogdisplay', { d: data } )
    }
    static bloginsert = async ( req, res ) =>{
        // console.log(req.body)
        //console.log(req.files)
        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload( file.tempFilePath, {
            folder:"blogs_image"
        })
        try{
            const result = new BlogModel( {
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url:myimage.secure_url,
                },
            } );
            await result.save()
            // only show url of route in redirect
            res.redirect( '/admin/blogdisplay' )
        } catch ( err ){
            console.log( err )
        }
    }
    static blogview = async ( req, res ) =>{
        // console.log(req.params.id)
        try{
            const result = await BlogModel.findById( req.params.id )
            // console.log(result)
            res.render( 'admin/blog/blogview', { blogview: result } )
        } catch ( err ){
            console.log( err )
        }
    }
    static blogedit = async ( req, res ) =>{
        //console.log( req.params.id )
        try{
            const result = await BlogModel.findById( req.params.id );

            res.render( "admin/blog/blogedit", { blogedit: result } );
        } catch ( err ){
            console.log( err );
        }
    };
    static blogupdate = async ( req, res ) =>{
        try{
            // console.log( req.params.id )
            // console.log(req.body)
             // below are for image deletion
            const blogdata = await BlogModel.findById(req.params.id)
            //console.log(blogdata)
            const imageid = blogdata.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            //image update code
            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: "blogs_image",
            });
            const result = await BlogModel.findByIdAndUpdate( req.params.id,{
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url:myimage.secure_url,
                },
            } );
            await result.save();
            res.redirect("/admin/blogdisplay")
        } catch ( err ){
            console.log( err );
        }
    }
    static blogdelete = async ( req, res ) =>{
        try{
            const blogdata = await BlogModel.findById(req.params.id)
            //console.log(blogdata)
            const imageid = blogdata.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            //console.log(req.params.id)
            const result = await BlogModel.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.redirect( "/admin/blogdisplay" )
        } catch ( err ){
            console.log( err );
        }
    }
}

module.exports = BlogController
