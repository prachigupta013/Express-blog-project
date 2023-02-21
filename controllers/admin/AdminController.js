class AdminController{
    static Dashboard = ( req, res ) =>{
        try
        {
            const {name,email}=req.admin
            res.render( 'admin/dashboard',{n:name,e:email} )
        } catch ( err )
        {
            console.log(err)
        }
    }
}
module.exports = AdminController