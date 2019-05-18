import React, {Component} from 'react';

/**
 * component which renders the each User List item(row) in the UserList component
 *
 * @author IT17006880
 */
class UserListItem extends Component {

    render() {
        return (

            this.props.users.map((list, index) => {//user list array list object passed through props is mapped and rendered
                return (

                    <tr key={index}>

                        <td>{list.name}</td>
                        <td>{list.email}</td>

                    </tr>

                );


            })


        );

    }
}

export default UserListItem;
