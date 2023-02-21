const jwt = require( 'jsonwebtoken' )
const AdminModel = require( '../models/Admin' )


const admin_auth = async ( req, res, next ) =>
{
    try
    {
        //console.log('Hello Admin !')
        const { token } = req.cookies
        //console.log(token)
        const verify_token = jwt.verify( token, 'teddybear' )
        //console.log(verify_token)
        const admin_data = await AdminModel.findOne( { _id: verify_token.id } )
        //console.log(admin_data)
        req.admin=admin_data
        next()
        
    } catch ( err )
    {
        res.redirect('/login')
    }
    
}

module.exports = admin_auth
