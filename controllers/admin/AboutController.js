const AboutModel = require( '../../models/About' )

class AboutController{
    static aboutdisplay = async( req, res ) =>{
        const data = await AboutModel.find()
        res.render('admin/about/aboutdisplay',{d:data})
    }
    static aboutinsert = async ( req, res ) =>{
        try{
            const result = new AboutModel( {
                description: req.body.description
            } );
            await result.save()
            // only show url of route in redirect
            res.redirect( '/admin/aboutdisplay' )
        } catch ( err ){
            console.log( err )
        }
    }
    static aboutview = async ( req, res ) =>{
        try{
            const result = await AboutModel.findById( req.params.id )
            res.render( 'admin/about/aboutview', { aboutview: result } )
        } catch ( err ){
            console.log( err )
        }
    }
    static aboutedit = async ( req, res ) =>{
        try{
            const result = await AboutModel.findById( req.params.id );
            res.render( "admin/about/aboutedit", { aboutedit: result } );
        } catch ( err ){
            console.log( err );
        }
    };
    static aboutupdate = async ( req, res ) =>{
        try{
            const result = await AboutModel.findByIdAndUpdate( req.params.id,{
                description: req.body.description
            } );
            await result.save();
            res.redirect("/admin/aboutdisplay")
        } catch ( err ){
            console.log( err );
        }
    }
    static aboutdelete = async ( req, res ) =>{
        try{
            const result = await AboutModel.findByIdAndDelete(req.params.id)
            res.redirect( "/admin/aboutdisplay" )
        } catch ( err ){
            console.log( err );
        }
    }
}
module.exports = AboutController