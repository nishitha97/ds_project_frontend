import React, {Component} from 'react';
import Axios from "../util/Axios";
import UserList from "./UserList";


/**
 * component which renders user details of all users in the database
 *
 * @author IT17006880
 */
class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            errors: null
        };
    }
    
    componentDidMount() {
       Axios.get("http://localhost:8081/api/v1/users")//api call to get all created users from the database
            .then(response =>
                response.data.map(user => ({//user array list mapped to a user object

                    name: user.username,
                    email: user.email
                }))

            )
           .then(users => {
                this.setState({//state is updated from the response
                    users:users,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));//when error occurs
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users} isLoading={this.state.isLoading}/>
            </div>

        );
    }

}

export default User;
