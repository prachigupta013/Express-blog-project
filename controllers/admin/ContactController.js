const ContactModel = require ('../../models/Contact')
class ContactController{
    static contactdisplay = async ( req, res ) =>{
        const data = await ContactModel.find()
        res.render('admin/contact/contactdisplay',{d:data})
    }
    static contactinsert = async ( req, res ) =>{
        try{
            const result = new ContactModel( {
                name: req.body.name,
                contact: req.body.contact,
                email: req.body.email,
                message:req.body.message,
            } );
            await result.save()
            // only show url of route in redirect
            res.redirect( '/admin/contactdisplay' )
        } catch ( err ){
            console.log( err )
        }
    }
    static contactview = async ( req, res ) =>{
        // console.log(req.params.id)
        try{
            const result = await ContactModel.findById( req.params.id )
            // console.log(result)
            res.render( 'admin/contact/contactview', { contactview: result } )
        } catch ( err ){
            console.log( err )
        }
    }
    static contactedit = async ( req, res ) =>{
        //console.log( req.params.id )
        try{
            const result = await ContactModel.findById( req.params.id );

            res.render( "admin/contact/contactedit", { contactedit: result } );
        } catch ( err ){
            console.log( err );
        }
    };
    static contactupdate = async ( req, res ) =>{
        try{
            const result = await ContactModel.findByIdAndUpdate( req.params.id,{
                name: req.body.name,
                contact: req.body.contact,
                email: req.body.email,
                message:req.body.message,
            } );
            await result.save();
            res.redirect("/admin/contactdisplay")
        } catch ( err ){
            console.log( err );
        }
    }
    static contactdelete = async ( req, res ) =>{
        try{
            
            const result = await ContactModel.findByIdAndDelete(req.params.id)
            // console.log(result)
            res.redirect( "/admin/contactdisplay" )
        } catch ( err ){
            console.log( err );
        }
    }
}
module.exports = ContactController
