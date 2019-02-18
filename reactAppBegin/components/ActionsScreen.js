import React from 'react';
import { Link } from 'react-router-dom';
const ScreenHeight = screen.height;
const ScreenWidth = screen.width;
import { ListGroup, ListGroupItem } from 'reactstrap';
export default class ActionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PersonalUniqueID: "",
            Gender: "",
            Age: "",
            FullName: "",
            FirstName: "",
            MiddleName: "",
            LastName: "",
            DateOfBirth: "",
            Address: "",
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            City: "",
            State: "",
            PhoneNo: "",
            MaritalStatus: "",
            EducationStatus: "",
            BirthSign: "",
            PhysicalDisability: "",
            PinCode: "",
            token: "",
            userRole: ""
        };
        console.log("this.props.params", this.props.location.state.userRole)
    }
    createNewUser() {
        alert("createNewUser")
    }
    onChangeTextInput(e) {
        // alert(e.target.name + e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {

        this.setState({
            PersonalUniqueID: this.props.location.state.userData.PersonalUniqueID,
            Gender: this.props.location.state.userData.Gender,
            Age: this.props.location.state.userData.Age,
            FirstName: this.props.location.state.userData.FullName.FirstName,
            MiddleName: this.props.location.state.userData.FullName.MiddleName,
            LastName: this.props.location.state.userData.FullName.LastName,
            DateOfBirth: this.props.location.state.userData.DateOfBirth,
            AddressLine1: this.props.location.state.userData.Address.AddressLine1,
            AddressLine2: this.props.location.state.userData.Address.AddressLine2,
            AddressLine3: this.props.location.state.userData.Address.AddressLine3,
            City: this.props.location.state.userData.City,
            State: this.props.location.state.userData.State,
            PhoneNo: this.props.location.state.userData.PhoneNo,
            MaritalStatus: this.props.location.state.userData.MaritalStatus,
            EducationStatus: this.props.location.state.userData.EducationStatus,
            BirthSign: this.props.location.state.userData.BirthSign,
            PhysicalDisability: this.props.location.state.userData.PhysicalDisability,
            PinCode: this.props.location.state.userData.PinCode,
            token: this.props.location.state.token,
            userRole: this.props.location.state.userRole
        })
    }

    UpdateUser() {

        var id = this.state.PersonalUniqueID;

        var user = {
            PersonalUniqueID: this.state.PersonalUniqueID,
            FullName: {
                FirstName: this.state.FirstName,
                MiddleName: this.state.MiddleName,
                LastName: this.state.LastName
            },
            Gender: this.state.Gender,
            DateOfBirth: this.state.DateOfBirth,
            Age: this.state.Age,
            Address: {
                AddressLine1: this.state.AddressLine1,
                AddressLine2: this.state.AddressLine2,
                AddressLine3: this.state.AddressLine3
            },
            City: this.state.City,
            State: this.state.State,
            PinCode: this.state.PinCode,
            PhoneNo: this.state.PhoneNo,
            PhysicalDisability: this.state.PhysicalDisability,
            MaritalStatus: this.state.MaritalStatus,
            EducationStatus: this.state.EducationStatus,
            BirthSign: this.state.BirthSign,
        }

        if (this.state.userRole == "Administrator") {
            // var user = {
            //     PersonalUniqueID: this.state.PersonalUniqueID,

            //     FullName: {
            //         FirstName: this.state.FirstName,
            //         MiddleName: this.state.MiddleName,
            //         LastName: this.state.LastName
            //     },
            //     Gender: this.state.Gender,
            //     DateOfBirth: this.state.DateOfBirth,
            //     Age: this.state.Age,
            //     Address: {
            //         AddressLine1: this.state.AddressLine1,
            //         AddressLine2: this.state.AddressLine2,
            //         AddressLine3: this.state.AddressLine3
            //     },
            //     City: this.state.City,
            //     State: this.state.State,
            //     PinCode: this.state.PinCode,
            //     PhoneNo: this.state.PhoneNo,
            //     PhysicalDisability: this.state.PhysicalDisability,
            //     MaritalStatus: this.state.MaritalStatus,
            //     EducationStatus: this.state.EducationStatus,
            //     BirthSign: this.state.BirthSign,
            // }

            fetch(`http://localhost:4070/api/updateuseradmin/${id}`, {
                method: 'put',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    "Authorization": "bearer" + " " + this.state.token
                }),
                body: JSON.stringify(user)
            }).then(response => response.json())
                .then(resData => {
                    console.log("Updated User details", JSON.stringify(resData.data))
                });
        } else if (this.state.userRole == "Operator" || this.state.userRole == "AccessUser") {
            // var user = {
            //     PersonalUniqueID: this.state.PersonalUniqueID,
            //     Gender: this.state.Gender,
            //     Age: this.state.Age,
            //     FullName: {
            //         FirstName: this.state.FirstName,
            //         MiddleName: this.state.MiddleName,
            //         LastName: this.state.LastName
            //     },
            //     DateOfBirth: this.state.DateOfBirth,
            //     Address: {
            //         AddressLine1: this.state.AddressLine1,
            //         AddressLine2: this.state.AddressLine2,
            //         AddressLine3: this.state.AddressLine3
            //     },
            //     City: this.state.City,
            //     State: this.state.State,
            //     PhoneNo: this.state.PhoneNo,
            //     MaritalStatus: this.state.MaritalStatus,
            //     EducationStatus: this.state.EducationStatus,
            //     BirthSign: this.state.BirthSign,
            //     PhysicalDisability: this.state.PhysicalDisability,
            //     PinCode: this.state.PinCode

            //}

            fetch(`http://localhost:4070/api/updateuser/${id}`, {
                method: 'put',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Credentials": "true",
                    "Authorization": "bearer" + " " + this.state.token
                }),
                body: JSON.stringify(user)
            }).then(response => response.json())
                .then(resData => {
                    console.log("Updated User details", JSON.stringify(resData.data))
                });

        }
    }
    DeleteUser() {
        var id = this.state.PersonalUniqueID;
        fetch(`http://localhost:4070/api/deleteuser/${id}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Authorization": "bearer" + " " + this.state.token
            })
        }).then(response => response.json())
            .then(resData => {
                console.log("deleted User details", JSON.stringify(resData.data))
            });

    }
    render() {
        return (
            <div className="container" style={{ backgroundColor: "#e3e3e3" }}>
                <div className="form-group">
                    <label>Personal Unique ID:</label>
                    <input type="text" name="PersonalUniqueID" placeholder="Unique ID" value={this.state.PersonalUniqueID}
                        onChange={this.onChangeTextInput.bind(this)} className="form-control" disabled />
                </div>
                <br />
                <div className="form-group">
                    <label>FullName:</label>
                    <div style={{ display: "flex" }}>
                        <input type="text" style={{ width: ScreenWidth / 4 }} value={this.state.FirstName}
                            name="FirstName" placeholder="First Name"
                            onChange={this.onChangeTextInput.bind(this)}
                            className="form-control" />
                        <input type="text" style={{ width: ScreenWidth / 4 }} value={this.state.MiddleName}
                            name="MiddleName" placeholder="Middle Name"
                            onChange={this.onChangeTextInput.bind(this)} className="form-control" />
                        <input type="text" style={{ width: ScreenWidth / 4 }}
                            value={this.state.LastName} name="LastName" placeholder="Last Name"
                            onChange={this.onChangeTextInput.bind(this)} className="form-control" />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <label>Gender</label>
                    <select type="text" value={this.state.Gender}
                        name="Gender"
                        onChange={this.onChangeTextInput.bind(this)}
                        className="form-control" placeholder="Gender" >
                        <option value="M">Male</option>
                        <option value="F">Female</option>

                    </select>
                    {/* <input type="text" name="Gender" value={this.state.Gender}
                            onChange={this.onChangeTextInput.bind(this)} className="form-control" /> */}
                </div>
                <br />
                <div className="form-group">
                    <label>Date Of Birth</label>
                    <input type="text" value={this.state.DateOfBirth} name="DateOfBirth"
                        placeholder="Date Of Birth"
                        onChange={this.onChangeTextInput.bind(this)} className="form-control" />
                </div>
                <br />
                <div>
                    <label >Age</label>
                    <input type="text" value={this.state.Age} name="Age" placeholder="Age"
                        onChange={this.onChangeTextInput.bind(this)} className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label >Address</label>
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="Address Line 1" onChange={this.onChangeTextInput.bind(this)} name="AddressLine1"
                            value={this.state.AddressLine1} className="form-control" />
                        <input type="text" placeholder="Address Line 2" onChange={this.onChangeTextInput.bind(this)} name="AddressLine2"
                            value={this.state.AddressLine2} className="form-control" />
                        <input type="text" placeholder="Address Line 3" onChange={this.onChangeTextInput.bind(this)} name="AddressLine3"
                            value={this.state.AddressLine3} className="form-control" />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <label>City</label>
                    <input placeholder="City" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.City} name="City" className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>State</label>
                    <input placeholder="State" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.State} name="State" className="form-control" />
                </div>
                <br />

                <div className="form-group">
                    <label>Pin Code</label>
                    <input placeholder="PinCode" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.PinCode} name="PinCode" className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>Phone No</label>
                    <input placeholder="PhoneNo" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.PhoneNo} name="PhoneNo" className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>Physical Disability</label>
                    <input placeholder="Physical Disability" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.PhysicalDisability} name="PhysicalDisability" className="form-control" />
                </div>
                <br />
                <div className="form-group">
                    <label>Marital Status</label>
                    {/* <input placeholder="MaritalStatus" onChange={this.onChangeTextInput.bind(this)}
                            value={this.state.MaritalStatus} name="MaritalStatus" className="form-control" /> */}
                    <select type="text" value={this.state.MaritalStatus}
                        name="MaritalStatus"
                        placeholder="Marital Status"
                        onChange={this.onChangeTextInput.bind(this)}
                        className="form-control">
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>

                    </select>
                </div>
                <br />
                <div className="form-group">
                    <label>Education Status</label>
                    <input placeholder="EducationStatus" onChange={this.onChangeTextInput.bind(this)}
                        value={this.state.EducationStatus} name="EducationStatus"
                        className="form-control" placeholder="Education Status" />
                </div>
                <br />
                <div className="form-group">
                    <label>Birth Sign</label>
                    <input placeholder="BirthSign" placeholder="PhysicalDisability"
                        onChange={this.onChangeTextInput.bind(this)} placeholder="PhysicalDisability"
                        value={this.state.BirthSign} name="BirthSign" className="form-control" />
                </div>
                <br />
                <br />

                <input type="button" value="Update" className="btn btn-success" onClick={() => this.UpdateUser()} />
                &nbsp; &nbsp; &nbsp; &nbsp;
                    <input type="button" value="Delete" className="btn btn-success" onClick={() => this.DeleteUser()} />
                &nbsp; &nbsp; &nbsp; &nbsp;

                </div>

        );
    }
}
