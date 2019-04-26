import React, {Component} from 'react';
import Axios from "../util/Axios";
import UserList from "./UserList";



class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            errors: null
        };
    }




    callDownload=(filename)=>{
        fetch('#', {


            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => response.blob())
            .then((blob) => {
                const imageurl = document.createElement('a');
                imageurl.href = window.URL.createObjectURL(blob);
                imageurl.download = filename;
                imageurl.click();

            }).catch((err) => {


        });
    }

    callUpload = (e) => {
        const files = Array.from(e.target.files)
        const formData = new FormData()

        files.forEach((file) => {
            formData.append("file",file)
        })


        fetch('#', {

            headers: {
                'Access-Control-Allow-Origin': '*',

            },
            method: 'POST',
            body:formData

        })
            .then(res => res.json())
            // .then(response => {
            //     this.setState({
            //         isUploaded: true,
            //         response
            //     })
            // })

    }

//     componentWillMount() {
//         //  Axios.get('http://localhost:8081/api/v1/users').then(res=>console.log(res.json))
//
//         Axios.get('http://localhost:8081/api/v1/users')
//             .then(response => {
//                 // const {users} = response.users;
//                 // console.log("dsdsdss"+response);
//                 // console.log(response.data);
//                 // //console.log(response.data.children)
//                 // let userList = [];
//                 // if (users) {
//                 //     users.map((user) => {
//                 //         const userObj = {
//                 //             userName: user.username,
//                 //             password: user.password
//                 //         };
//                 //         userList = [...userList, userObj];
//                 //         console.log("sasasasasasasas"+userList);
//                 //     });
//                 // }
//                 response.data.users.map(user => ({
//
//                     name: `${user.username} `,
//                     username: `${user.password}`,
//                     email: `${user.email}`,
//
//                 }))
//                     .then(users => {
//                         this.setState({
//                             users
//                         });
//
//                     })
//
//                 //
//                 // fetch('http://localhost:8081/api/v1/users', {
//                 //     headers: {
//                 //         'Access-Control-Allow-Origin': '*',
//                 //     }
//                 // })
//                 //     .then((response) =>console.log( response.json()))
//                 //     // .then((blob) => {
//                 //     //     const imageurl=document.createElement('a');
//                 //     //     imageurl.href = window.URL.createObjectURL(blob);
//                 //     //     imageurl.download="myFileName.jpeg";
//                 //     //     imageurl.click();
//                 //     //
//                 //     //
//                 //     // });
//                 //
//
//             }
//
//
//
//
//
//
//
// }
//

    componentDidMount() {
       Axios.get("http://localhost:8081/api/v1/users")
            .then(response =>
                response.data.map(user => ({

                    name: user.username,
                    email: user.email
                }))
                // {
                //     this.setState({
                //         users:response.data.users,
                //         isLoading: false
                //     });
                // }

            )
           .then(users => {
                this.setState({
                    users:users,
                    isLoading: false
                });
            })

            .catch(error => this.setState({ error, isLoading: false }));
    }






    render() {
        return (
            <div>
                <UserList users={this.state.users} isLoading={this.state.isLoading}/>
            </div>

        );
    }

    // render() {
    //     const {isLoading, users} = this.state;
    //     return (
    //         <React.Fragment>
    //             <h2>Random User</h2>
    //             <div>
    //                 {!isLoading ? (
    //                     users.map(user => {
    //                         const { name, email} = user;
    //                         return (
    //                             <div>
    //                                 <p>{name}</p>
    //                                 <div>
    //                                     <img alt={name}/>
    //                                 </div>
    //                                 <p>{email}</p>
    //                                 <hr/>
    //                             </div>
    //                         );
    //                     })
    //                 ) : (
    //                     <p>Loading...</p>
    //                 )}
    //             </div>
    //         </React.Fragment>
    //     );
    // }
}

export default User;
