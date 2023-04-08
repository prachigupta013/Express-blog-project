const cloudinary = require( 'cloudinary' ).v2;
const BlogModel = require( '../../models/Blog' )

cloudinary.config( {
    cloud_name: 'dbfph5krr',
    api_key: '776869699764881',
    api_secret: 'A1zyy2-8Q1WFd4NbFJpsd9GaQ2s',
} );

class BlogController
{
    static blogdisplay = async ( req, res ) =>
    {
        const data = await BlogModel.find()
        // console.log(data)
        res.render( 'admin/blog/blogdisplay', { d: data } )
    }
    static bloginsert = async ( req, res ) =>
    {
        // console.log(req.body)
        //console.log(req.files)
        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload( file.tempFilePath, {
            folder: "blogs_image"
        } )
        try
        {
            const result = new BlogModel( {
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url,
                },
            } );
            await result.save()
            // only show url of route in redirect
            res.redirect( '/admin/blogdisplay' )
        } catch ( err )
        {
            console.log( err )
        }
    }
    static blogview = async ( req, res ) =>
    {
        // console.log(req.params.id)
        try
        {
            const result = await BlogModel.findById( req.params.id )
            // console.log(result)
            res.render( 'admin/blog/blogview', { blogview: result } )
        } catch ( err )
        {
            console.log( err )
        }
    }
    static blogedit = async ( req, res ) =>
    {
        //console.log( req.params.id )
        try
        {
            const result = await BlogModel.findById( req.params.id );

            res.render( "admin/blog/blogedit", { blogedit: result } );
        } catch ( err )
        {
            console.log( err );
        }
    };
    static blogupdate = async ( req, res ) =>
    {
        try
        {
            if ( req.files )
            {
                const blogdata = await BlogModel.findById( req.params.id )
                const imageid = blogdata.image.public_id
                await cloudinary.uploader.destroy( imageid )

                //image update code
                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload( file.tempFilePath, {
                    folder: "blogs_image",
                } );
                var image_data = {
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                }
            } else
            {
                var image_data = {
                    title: req.body.title,
                    description: req.body.description,

                }
            }
            

            const result = await BlogModel.findByIdAndUpdate( req.params.id, image_data );
            await result.save();
            res.redirect( "/admin/blogdisplay" )
        } catch ( err )
        {
            console.log( err );
        }
    }
    static blogdelete = async ( req, res ) =>
    {
        try
        {
            const blogdata = await BlogModel.findById( req.params.id )
            const imageid = blogdata.image.public_id
            await cloudinary.uploader.destroy( imageid )
            const result = await BlogModel.findByIdAndDelete( req.params.id )
            res.redirect( "/admin/blogdisplay" )
        } catch ( err )
        {
            console.log( err );
        }
    }
}

module.exports = BlogController
