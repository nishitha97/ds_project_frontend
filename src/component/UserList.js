import React, {Component} from 'react';
import UserListItem from "./UserListItem";


/**
 * component which renders the user list to be displayed in the User component
 *
 * @author IT17006880
 */
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.users

        }
        console.log(this.state.data)
    }


    /*delete = (id) => {
        this.setState(prevState => ({
            data: prevState.data.filter(el => el !== id)
        }));
        console.log(id);
    }*/


    render() {


        return (
            <div>
                <table className={'table table-hover'}>
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                <UserListItem users={this.props.users} isLoading={this.props.isLoading} delete={this.delete}/>
                    </tbody>
                </table>
            </div>

        );
    }
}

export default UserList;
