import React, {Component} from 'react';
import UserListItem from "./UserListItem";



class UserList extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.users

        }
        console.log(this.state.data)
    }


    delete = (id) => {
        this.setState(prevState => ({
            data: prevState.data.filter(el => el !== id)
        }));
        console.log(id);
    }


    render() {


        return (
            <div>
                <table className={'table table-hover'} style={{height:100,width:100,align:"center"}}>
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
