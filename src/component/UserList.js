import React, {Component} from 'react';
import ListItem from './UserListItem';


class List extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:this.props.users
        }

    }


    delete = (id) => {
        this.setState(prevState => ({
            users: prevState.users.filter(el => el != id)
        }));
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
                <ListItem users={this.props.users} isLoading={this.props.isLoading} delete={this.delete}/>
                    </tbody>
                </table>
            </div>

        );
    }
}



export default List;
