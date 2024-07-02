
import UserProfile from '../../components/profile/UserProfile'
import "./User.css"
import Order from '../../components/orders/Order'

const User = () => {
  return (
    <div className='user-details'>
      <UserProfile/>
      <Order/>
    </div>
  )
}

export default User;
