import React from 'react';
import { Link } from 'react-router-dom';
const ScreenHeight = screen.height;
const ScreenWidth = screen.width;
import { ListGroup, ListGroupItem } from 'reactstrap';
export default class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingUsersData: [],
            token: ""
        }
    }
    getAllPendingUsersData() {

        fetch('http://localhost:4070/api/users/allPendingUsers', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Authorization": "bearer" + " " + this.state.token
            })

        }).then(response => response.json())
            .then(resData => {
                console.log("All pending Users array", JSON.stringify(resData.data))
                this.setState({
                    pendingUsersData: resData.data
                });
            });

        //end


    }
    render() {
        return (
            <div>
                <br />
                <br />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            {Object.keys(this.state.pendingUsersData[0]).map((p, i) => (
                                p != "_id" &&
                                <th > {p} </th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.pendingUsersData.map((user, idx) => (
                            <tr onClick={() => this.showDetails(user)}>
                                {/* <td >{user._id}</td> */}
                                <td >{user.PersonalUniqueID}</td>
                                <td>{user.FullName.FirstName + " " + user.FullName.MiddleName + " " + user.FullName.LastName}</td>
                                <td>{user.Gender}</td>
                                <td>{user.DateOfBirth}</td>
                                <td>{user.Age}</td>
                                <td >{user.Address.AddressLine1 + user.Address.AddressLine2 + user.Address.AddressLine3}</td>
                                <td>{user.City}</td>
                                <td>{user.State}</td>
                                <td>{user.PinCode}</td>
                                <td>{user.PhoneNo}</td>
                                <td>{user.PhysicalDisability}</td>
                                <td>{user.MaritalStatus}</td>
                                <td>{user.EducationStatus}</td>
                                <td>{user.BirthSign}</td>
                                <td style={{ color: "#7CFC00" }}>UPDATE</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}