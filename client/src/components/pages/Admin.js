import NewSite from '../admin/Newsite';
import Users from '../admin/Users'
import Site from '../admin/Sites'


const Admin = () => {
    return (
        <>
        <h2>Site Administration</h2>
            {<Users />}
            {<NewSite />}
            {<Site />}
        </>
    )
}

export default Admin;