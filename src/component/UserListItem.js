import React, {Component} from 'react';


class ListItem extends Component {

    constructor(props){
        super(props);
    }




    delete(id) {
        this.props.delete(id);
    }



    render() {
        return (
            this.props.users.map((list,index)=>{
                return(

                      <tr key={index}>

                          <td>{list.email}</td>
                          <td>{list.name}</td>
                          <td><button onClick={this.delete.bind(this,list)}>Delete</button></td>
                      </tr>

                );



            })


        );

    }
}

export default ListItem;
