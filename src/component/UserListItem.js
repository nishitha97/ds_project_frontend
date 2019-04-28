import React, {Component} from 'react';


class UserListItem extends Component {

/*

    delete(id) {
        this.props.delete(id);
    }
*/



    render() {
        return (

            this.props.users.map((list,index)=>{
                return(

                      <tr key={index}>

                          <td>{list.name}</td>
                          <td>{list.email}</td>

                       {/*   <td><button onClick={this.delete.bind(this,index)}>Delete</button></td>*/}
                      </tr>

                );



            })


        );

    }
}

export default UserListItem;
