import React, { Component } from 'react';
const ScreenHeight = screen.height;
const ScreenWidth = screen.width;
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardHeader
} from 'reactstrap';
import classnames from 'classnames';
import history from '../history';
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //create user form fields for admin and operator role
            //  createUserId: "",
            createUserName: "",
            createPassword: "",
            createCPassword: "",
            createSelectedRole: "AccessUser",
            createSelectedRoleID: "3",
            createEmailId: "",
            createPersonalUniqueID: "",
            createGender: "M",
            createAge: "",
            createFullName: {},
            createFirstName: "",
            createMiddleName: "",
            createLastName: "",
            createDateOfBirth: "",
            createAddress: "",
            createAddressLine1: "",
            createAddressLine2: "",
            createAddressLine3: "",
            createCity: "",
            createState: "",
            createPhoneNo: "",
            createMaritalStatus: "Married",
            createEducationStatus: "",
            createBirthSign: "",
            createPhysicalDisability: "",
            createPinCode: "",

            // display and update fields for AccessUser
            userName: "",
            userRole: "",
            userId: "",
            activeTab: '1',
            token: "",
            selectedRole: "AccessUser",
            Gender: "M",
            Age: "",
            FullName: {},
            FirstName: "",
            MiddleName: "",
            LastName: "",
            DateOfBirth: "",
            Address: {},
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

            //other fields
            roles: ["AccessUser", "Operator", "Administrator"],
            editProfile: false,
            allUsersData: [],
            tableDisplay: false,
            pendingUsersData: [],
            searchText: "",

        };
        console.log("this.props.params", this.props.location.state)
        //   console.log("this.props", this.props)
        this.toggle = this.toggle.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);

        this.getAllPendingUsersData = this.getAllPendingUsersData.bind(this)
        this.getUserPersonalInfo(this.props.location.state.authenticatedUserData.UserID,
            this.props.location.state.authenticationToken);
        //   this.getUserPersonalInfo = this.getUserPersonalInfo.bind(this);
        //    this.changed = this.changed.bind(this);
    }



    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });

            this.getAllUsers();
            this.getAllPendingUsersData();

        }
    }


    editInfo() {
        this.setState({ editProfile: true })
    }
    componentDidMount() {
        this.setState({
            userName: this.props.location.state.authenticatedUserData.UserName,
            userRole: this.props.location.state.authenticatedUserData.Role,
            userId: this.props.location.state.authenticatedUserData.UserID,
            token: this.props.location.state.authenticationToken
        })
        // if (this.state.userId != "" && this.state.userId != undefined) {

        // }

    }
    // onChangeTextInputRole(e) {

    //     if (this.state.createSelectedRole === "Administrator") {
    //         this.setState({ [e.target.name]: e.target.value });
    //         this.setState({ createSelectedRoleID: 3 });
    //     } else if (this.state.createSelectedRole === "Operator") {
    //         this.setState({ [e.target.name]: e.target.value });
    //         this.setState({ createSelectedRoleID: 2 });
    //     }
    //     else {
    //         this.setState({ [e.target.name]: e.target.value });
    //         this.setState({ createSelectedRoleID: 3 });
    //     }
    // }

    onChangeTextInput(e) {
        this.setState({ [e.target.name]: e.target.value });
        // alert(e.target.name + e.target.value)

    }
    getUserPersonalInfo(userID, token) {
        // alert("hii")
        var id = userID;
        var Token = token
        console.log("userId", id)
        fetch(`http://localhost:4070/api/user/getPersonalInfo/${id}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Authorization": "bearer" + " " + Token
            })
        }).then(response => response.json())
            .then(resData => {
                console.log(JSON.stringify(resData.data))

                this.setState({
                    PersonalUniqueID: resData.data[0].PersonalUniqueID,
                    Gender: resData.data[0].Gender,
                    Age: resData.data[0].Age,
                    FirstName: resData.data[0].FullName.FirstName,
                    MiddleName: resData.data[0].FullName.MiddleName,
                    LastName: resData.data[0].FullName.LastName,
                    DateOfBirth: resData.data[0].DateOfBirth,
                    FullName: {
                        FirstName: resData.data[0].FullName.FirstName,
                        MiddleName: resData.data[0].FullName.MiddleName,
                        LastName: resData.data[0].FullName.LastName,
                    },

                    AddressLine1: resData.data[0].Address.AddressLine1,
                    AddressLine2: resData.data[0].Address.AddressLine2,
                    AddressLine3: resData.data[0].Address.AddressLine3,
                    Address: {
                        AddressLine1: resData.data[0].Address.AddressLine1,
                        AddressLine2: resData.data[0].Address.AddressLine2,
                        AddressLine3: resData.data[0].Address.AddressLine3,
                    },
                    City: resData.data[0].City,
                    State: resData.data[0].State,
                    PhoneNo: resData.data[0].PhoneNo,
                    MaritalStatus: resData.data[0].MaritalStatus,
                    EducationStatus: resData.data[0].EducationStatus,
                    BirthSign: resData.data[0].BirthSign,
                    PhysicalDisability: resData.data[0].PhysicalDisability,
                    PinCode: resData.data[0].PinCode,
                }); //this is an asynchronous function
            });

    }
    generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    };
    createNewUser() {

        let randomId = this.generateUniqueId()
        console.log("randomId", randomId);
        var user = {
            UserID: randomId,
            //this.state.createUserId,
            UserName: this.state.createUserName,
            Password: this.state.createPassword,
            EmailAddress: this.state.createEmailId,
            Role: this.state.createSelectedRole,
            RoleID: this.state.createSelectedRoleID
        };

        var personalInfo = {
            PersonalUniqueID: randomId,
            //this.state.createUserId,
            Gender: this.state.createGender,
            FullName: {
                FirstName: this.state.createFirstName,
                MiddleName: this.state.createMiddleName,
                LastName: this.state.createLastName,
            },
            Age: this.state.createAge,
            DateOfBirth: this.state.createDateOfBirth,
            Address: {
                AddressLine1: this.state.createAddressLine1,
                AddressLine2: this.state.createAddressLine2,
                AddressLine3: this.state.createAddressLine3
            },
            City: this.state.createCity,
            State: this.state.createState,
            PhoneNo: this.state.createPhoneNo,
            MaritalStatus: this.state.createMaritalStatus,
            EducationStatus: this.state.createEducationStatus,
            BirthSign: this.state.createBirthSign,
            PhysicalDisability: this.state.createPhysicalDisability,
            PinCode: this.state.createPinCode
        }

        if ((this.state.createUserName != "" && this.state.createFirstName != "" &&
            this.state.createMaritalStatus != "" && this.state.createMiddleName != "" &&
            this.state.createEmailId != "" && this.state.createLastName != "" &&
            this.state.createSelectedRole != "" && this.state.createAge != "" &&
            this.state.createSelectedRoleID != "" && this.state.createDateOfBirth != "" &&
            this.state.createGender != "" && this.state.createAddressLine1 != "" &&
            this.state.createEducationStatus != "" && this.state.createAddressLine2 != "" &&
            this.state.createCity != "" && this.state.createAddressLine3 != "" &&
            this.state.createState != "" && this.state.createPhoneNo != "" &&
            this.state.createBirthSign != "" && this.state.createPinCode != "" &&
            this.state.createPhysicalDisability != "" && this.state.createPassword != "") &&
            (this.state.createUserName != undefined && this.state.createFirstName != undefined &&
                this.state.createMaritalStatus != undefined && this.state.createMiddleName != undefined &&
                this.state.createEmailId != undefined && this.state.createLastName != undefined &&
                this.state.createSelectedRole != undefined && this.state.createAge != undefined &&
                this.state.createSelectedRoleID != undefined && this.state.createDateOfBirth != undefined &&
                this.state.createGender != undefined && this.state.createAddressLine1 != undefined &&
                this.state.createEducationStatus != undefined && this.state.createAddressLine2 != undefined &&
                this.state.createCity != undefined && this.state.createAddressLine3 != undefined &&
                this.state.createState != undefined && this.state.createPhoneNo != undefined &&
                this.state.createBirthSign != undefined && this.state.createPinCode != undefined &&
                this.state.createPhysicalDisability != undefined && this.state.createPassword != undefined)) {
            if (this.state.userRole == "Administrator") {
                fetch('http://localhost:4070/api/users/create', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Credentials": "true",
                        "Authorization": "bearer" + " " + this.state.token

                    }),
                    body: JSON.stringify(user)
                }).then(response => response.json())
                    .then(resData => {
                        console.log(JSON.stringify(resData))
                    });

                fetch('http://localhost:4070/api/addpersonalInfo', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Credentials": "true",
                        "Authorization": "bearer" + " " + this.state.token

                    }),
                    body: JSON.stringify(personalInfo)
                }).then(response => response.json())
                    .then(resData => {
                        console.log(JSON.stringify(resData))
                    });


            } else if (this.state.userRole == "Operator") {
                fetch('http://localhost:4070/api/users/createtemp', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Credentials": "true",
                        "Authorization": "bearer" + " " + this.state.token

                    }),
                    body: JSON.stringify(user)
                }).then(response => response.json())
                    .then(resData => {
                        console.log(JSON.stringify(resData))
                    });

                fetch('http://localhost:4070/api/temp/addpersonalInfo', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Credentials": "true",
                        "Authorization": "bearer" + " " + this.state.token

                    }),
                    body: JSON.stringify(personalInfo)
                }).then(response => response.json())
                    .then(resData => {
                        console.log(JSON.stringify(resData))
                    });
            }
        } else {
            alert("Please fill all details")
        }
    }

    // addPersonalInfo(id) {
    //     //var id = id;
    //     console.log(id);
    //     var personalInfo = {
    //         PersonalUniqueID: this.state.createUserId,
    //         Gender: this.state.createGender,
    //         FullName: {
    //             FirstName: this.state.createFirstName,
    //             MiddleName: this.state.createMiddleName,
    //             LastName: this.state.createLastName,
    //         },
    //         Age: this.state.createAge,
    //         DateOfBirth: this.state.createDateOfBirth,
    //         Address: {
    //             AddressLine1: this.state.createAddressLine1,
    //             AddressLine2: this.state.createAddressLine2,
    //             AddressLine3: this.state.createAddressLine3
    //         },
    //         City: this.state.createCity,
    //         State: this.state.createState,
    //         PhoneNo: this.state.createPhoneNo,
    //         MaritalStatus: this.state.createMaritalStatus,
    //         EducationStatus: this.state.createEducationStatus,
    //         BirthSign: this.state.createBirthSign,
    //         PhysicalDisability: this.state.createPhysicalDisability,
    //         PinCode: this.state.createPinCode
    //     }
    //     fetch('http://localhost:4070/api/addpersonalInfo', {
    //         method: 'post',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Credentials": "true",
    //             "Authorization": "bearer" + " " + this.state.token

    //         }),
    //         body: JSON.stringify(personalInfo)
    //     }).then(response => response.json())
    //         .then(resData => {
    //             console.log(JSON.stringify(resData))
    //         });

    // }
    getAllUsers() {
        fetch('http://localhost:4070/api/users/allUsers', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Authorization": "bearer" + " " + this.state.token
            })

        }).then(response => response.json())
            .then(resData => {
                console.log("All Users array", JSON.stringify(resData.data))
                this.setState({
                    allUsersData: resData.data
                });
            });

        //end
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

    changed(event) {
        this.setState({ [event.target.name]: event.target.value })
        // this.setState({
        //     createSelectedRole: event.target.value
        // });
        //alert(this.state.createSelectedRole);
    }
    displayTable() {
        this.setState({ tableDisplay: true })
    }
    collapseTable() {
        this.setState({ tableDisplay: false })
    }
    approveUpdate(userData) {
        // alert(JSON.stringify(userData));
        fetch("http://localhost:4070/api/users/approval/one", {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": "true",
                "Authorization": "bearer" + " " + this.state.token
            }),
            body: JSON.stringify(userData)
        }).then(response => response.json())
            .then(resData => {
                console.log("approval 1 User details", JSON.stringify(resData));
                if (resData.statusCode === 200) {

                    fetch("http://localhost:4070/api/users/approval/two", {
                        method: 'put',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Credentials": "true",
                            "Authorization": "bearer" + " " + this.state.token
                        }),
                        body: JSON.stringify(userData)
                    }).then(response => response.json())
                        .then(res => {
                            console.log("approval 2 User details", JSON.stringify(res));
                            if (resData.statusCode === 200) {
                                fetch("http://localhost:4070/api/users/approval/three", {
                                    method: 'delete',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        "Access-Control-Allow-Credentials": "true",
                                        "Authorization": "bearer" + " " + this.state.token
                                    }),
                                    body: JSON.stringify(userData)
                                }).then(response => response.json())
                                    .then(resp => {
                                        console.log("approval 3 User details", JSON.stringify(resp));
                                    });
                            }
                        })
                }

            });
    }
    rejectUpdate(user) {
        alert("Reject");
        var id = user.PersonalUniqueID;
        fetch(`http://localhost:4070/api/deleteTempUser/${id}`, {
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
    logout() {
        history.push('/')
    }
    searchUser(event) {
        // alert(event.target.value)
        this.setState({ searchText: event.target.value })
        // alert(this.state.searchText);
        if (this.state.searchText.length > 0) {
            this.state.allUsersData = this.state.allUsersData.filter((data) => {
                return (data.FullName.FirstName).toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1;
            })
            this.forceUpdate();
            // this.state.allUsersData = this.state.allUsersData.filter(data => {

            //     if (data.FullName.FirstName === this.state.searchText) {
            //         return data;
            //     }

            // })
            // this.forceUpdate();
        } else {
            this.getAllUsers();
        }
    }

    render() {

        return (
            <div>
                {(this.state.userRole == "Administrator" || this.state.userRole == "Operator") &&
                    <div>
                        <Nav tabs>
                            <NavItem style={{ width: ScreenWidth / 5 }}>
                                <NavLink style={{ textAlign: "center" }}
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}>Create New User
                            </NavLink>
                            </NavItem>
                            <NavItem style={{ width: ScreenWidth / 5 }}>
                                <NavLink style={{ textAlign: "center" }}
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}>All Users Data
                            </NavLink>
                            </NavItem>
                            {this.state.userRole == "Administrator" &&
                                <NavItem style={{ width: ScreenWidth / 4 }}>
                                    <NavLink style={{ textAlign: "center" }}
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>Update Requests from users
                                </NavLink>
                                </NavItem>
                            }
                            <NavItem style={{ width: ScreenWidth / 5 }}>
                                <NavLink style={{ textAlign: "center" }}
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.logout() }}>Logout
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="container" style={{ backgroundColor: "#e3e3e3" }}>
                                    <br />
                                    <Card>
                                        <CardHeader>STEP 1: Create login credentials</CardHeader>
                                        <CardBody>
                                            <div className="form-group">
                                                <label>Username:</label>
                                                <input type="text" placeholder="Username i.e abc@123"
                                                    value={this.state.createUserName} name="createUserName"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Password:</label>
                                                <input type="text" placeholder="Password"
                                                    value={this.state.createPassword} name="createPassword"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Confirm Password:</label>
                                                <input type="text" placeholder="Confirm Password"
                                                    value={this.state.createCPassword} name="createCPassword"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control" required />
                                            </div>
                                            <br />
                                            <div>
                                                <label >User Role:</label>
                                                <select type="text" placeholder="User Role" value={this.state.createSelectedRole}
                                                    name="createSelectedRole"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control"
                                                >
                                                    <option value="AccessUser">AccessUser</option>
                                                    <option value="Operator">Operator</option>
                                                    <option value="Administrator">Administrator</option>
                                                </select>
                                            </div>
                                            <br />
                                            {/* <div className="form-group">
                                                <label>Role Id:</label>
                                                <input type="text" placeholder="Role Id"
                                                    onChange={this.onChangeTextInputRole.bind(this)}
                                                    name="createSelectedRoleID"
                                                    value={this.state.createSelectedRoleID}
                                                    required className="form-control" disabled />
                                            </div> */}
                                            <div className="form-group">
                                                <label>Role Id:</label>
                                                {this.state.createSelectedRole == "Administrator" &&
                                                    <input type="text" placeholder="Role Id"
                                                        name="createSelectedRoleID"
                                                        value={1}
                                                        onChange={(value) => this.setState({ createSelectedRoleID: value })}
                                                        required
                                                        className="form-control" />
                                                }
                                                {this.state.createSelectedRole == "Operator" &&
                                                    <input type="text" placeholder="Role Id"
                                                        name="createSelectedRoleID"
                                                        value={2}
                                                        required
                                                        onChange={(value) => this.setState({ createSelectedRoleID: value })}
                                                        className="form-control" />
                                                }
                                                {this.state.createSelectedRole == "AccessUser" &&
                                                    <input type="text" placeholder="Role Id"
                                                        name="createSelectedRoleID"
                                                        value={3}
                                                        required
                                                        onChange={(value) => this.setState({ createSelectedRoleID: value })}

                                                        className="form-control" />
                                                }
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Email Id:</label>
                                                <input placeholder="Email Id i.e abc@gmail.com" required onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createEmailId} name="createEmailId" required className="form-control" />
                                            </div>
                                            <br />
                                        </CardBody>
                                    </Card>
                                    <br />
                                    <Card>
                                        <CardHeader>STEP 2: Enter full information</CardHeader>
                                        <CardBody>
                                            <div className="form-group">
                                                <label>FullName:</label>
                                                <div style={{ display: "flex" }}>
                                                    <input type="text" style={{ width: ScreenWidth / 4 }}
                                                        value={this.state.createFirstName}
                                                        name="createFirstName" placeholder="First Name"
                                                        onChange={this.onChangeTextInput.bind(this)}
                                                        className="form-control" required />
                                                    <input type="text" style={{ width: ScreenWidth / 4 }}
                                                        value={this.state.createMiddleName}
                                                        name="createMiddleName" placeholder="Middle Name"
                                                        onChange={this.onChangeTextInput.bind(this)}
                                                        className="form-control" required />
                                                    <input type="text" style={{ width: ScreenWidth / 4 }}
                                                        value={this.state.createLastName}
                                                        name="createLastName" placeholder="Last Name"
                                                        onChange={this.onChangeTextInput.bind(this)}
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <select type="text" value={this.state.createGender}
                                                    name="createGender" placeholder="Gender"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control">
                                                    <option value="M">Male</option>
                                                    <option value="F">Female</option>
                                                </select>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Date Of Birth</label>
                                                <input type="text" value={this.state.createDateOfBirth} placeholder="Date Of Birth" name="createDateOfBirth"
                                                    onChange={this.onChangeTextInput.bind(this)} className="form-control" required />
                                            </div>
                                            <br />
                                            <div>
                                                <label >Age</label>
                                                <input type="text" value={this.state.createAge} name="createAge" placeholder="Age"
                                                    onChange={this.onChangeTextInput.bind(this)} className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label >Address</label>
                                                <div style={{ display: "flex" }}>
                                                    <input type="text" onChange={this.onChangeTextInput.bind(this)} name="createAddressLine1"
                                                        value={this.state.createAddressLine1} placeholder="AddressLine1" className="form-control" required />
                                                    <input type="text" onChange={this.onChangeTextInput.bind(this)} name="createAddressLine2"
                                                        value={this.state.createAddressLine2} placeholder="AddressLine2" className="form-control" required />
                                                    <input type="text" onChange={this.onChangeTextInput.bind(this)} name="createAddressLine3"
                                                        value={this.state.createAddressLine3} placeholder="AddressLine3" className="form-control" required />
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>City</label>
                                                <input placeholder="City" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createCity} name="createCity" className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>State</label>
                                                <input placeholder="State" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createState} name="createState" className="form-control" required />
                                            </div>
                                            <br />

                                            <div className="form-group">
                                                <label>Pin Code</label>
                                                <input placeholder="PinCode" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createPinCode} name="createPinCode" className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Phone No</label>
                                                <input placeholder="Phone No" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createPhoneNo} name="createPhoneNo" className="form-control" required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Physical Disability</label>
                                                <input placeholder="Physical Disability" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createPhysicalDisability} name="createPhysicalDisability" className="form-control"
                                                    required />
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Marital Status</label>
                                                <select type="text" value={this.state.createMaritalStatus}
                                                    name="createMaritalStatus"
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
                                                <select type="text" value={this.state.createEducationStatus}
                                                    name="createEducationStatus"
                                                    placeholder="Education Status"
                                                    onChange={this.onChangeTextInput.bind(this)}
                                                    className="form-control">
                                                    <option value="Masters">Masters</option>
                                                    <option value="Phd">Phd</option>
                                                    <option value="Graduate">Graduate</option>
                                                    <option value="Under-Graduate">Under-Graduate</option>
                                                    <option value="HSC">HSC</option>
                                                    <option value="SSC">SSC</option>
                                                    <option value="Not Applicable">Not Applicable</option>
                                                </select>
                                                {/* <input placeholder="Education Status" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createEducationStatus} name="createEducationStatus" className="form-control" /> */}
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label>Birth Sign</label>
                                                <input placeholder="Birth Sign, if any" onChange={this.onChangeTextInput.bind(this)}
                                                    value={this.state.createBirthSign} name="createBirthSign"
                                                    className="form-control" required />
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <br />
                                    <br />
                                    <input type="button" value="Register User" className="btn btn-success" onClick={this.createNewUser.bind(this)} />
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <input type="button" className="btn btn-success" value="Back to Login" onClick={this.goBack} />
                                </div>

                            </TabPane>
                            <TabPane tabId="2">
                                {this.state.allUsersData.length > 0 &&
                                    <div>
                                        <br />
                                        <br />

                                        <input type="text" placeholder="Search User"
                                            className="form-control" name="searchText"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50,
                                                marginLeft: 70
                                            }}

                                            value={this.state.searchText}
                                            onChange={this.searchUser.bind(this)} />

                                        {this.state.tableDisplay == false &&
                                            <div>
                                                <br />
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                                <input type="button" value="View Full Details Of Users" className="btn btn-default"
                                                    onClick={() => this.displayTable()} />
                                                &nbsp; &nbsp;
                                                <br />
                                                <div className="table table-striped table-bordered" style={{ paddingLeft: 30 }}>
                                                    <br />
                                                    {this.state.allUsersData.map((user, idx) => (
                                                        <tr onClick={() => this.showDetails(user)}>
                                                            <td >{user.PersonalUniqueID}</td>
                                                            <td>{user.FullName.FirstName + " " + user.FullName.MiddleName + " " + user.FullName.LastName}</td>
                                                            <td style={{ color: "#7CFC00" }}>UPDATE</td>
                                                        </tr>
                                                    ))
                                                    }
                                                    <br />
                                                    <br />
                                                </div>
                                            </div>
                                        }
                                        {this.state.tableDisplay == true &&
                                            <div>
                                                <br />
                                                &nbsp; &nbsp; &nbsp; &nbsp;
                                                <input type="button" value="View Less Details" className="btn btn-default"
                                                    onClick={() => this.collapseTable()} />
                                                &nbsp; &nbsp;
                                                <br />
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            {Object.keys(this.state.allUsersData[0]).map((p, i) => (
                                                                (p != "_id" && p != "__v") &&
                                                                <th > {p} </th>
                                                            ))
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.allUsersData.map((user, idx) => (
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
                                        }
                                    </div>
                                }
                            </TabPane>
                            <TabPane tabId="3">
                                {this.state.pendingUsersData.length === 0 &&
                                    <div >
                                        <br />
                                        <label style={{ color: "#FF0000", marginLeft: 100 }}>No Requests Received</label>
                                        <br />
                                    </div>
                                }
                                {this.state.pendingUsersData.length > 0 &&
                                    <div>
                                        <br />
                                        <br />
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    {Object.keys(this.state.pendingUsersData[0]).map((p, i) => (
                                                        (p != "_id" && p != "__v") &&
                                                        <th > {p} </th>
                                                    ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.pendingUsersData.map((user, idx) => (
                                                    //   onClick={() => this.showDetails(user)}
                                                    <tr >
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
                                                        <td> <input type="button" value="APPROVE" className="btn btn-success"
                                                            onClick={() => this.approveUpdate(user)} /></td>
                                                        <td>    <input type="button" value="REJECT" className="btn btn-success"
                                                            onClick={() => this.rejectUpdate(user)} /></td>

                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                }
                            </TabPane>
                            <TabPane tabId="4">
                            </TabPane>
                        </TabContent>

                    </div>
                }


                {this.state.userRole == "AccessUser" &&
                    <TabContent activeTab={this.state.activeTab}>

                        <TabPane tabId="1">
                            {this.state.editProfile == false &&
                                <div className="container" style={{ marginTop: 20 }}>
                                    <div>
                                        <label >USER Id: </label>
                                        {/* <label>{this.state.PersonalUniqueID}</label> */}
                                        <input type="text" className="form-control" placeholder="PersonalUniqueID" style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} value={this.state.PersonalUniqueID} disabled />
                                    </div>
                                    <br />
                                    <div>
                                        <label >USER NAME: </label>
                                        {/* <label>{this.state.FirstName}{"  "}{this.state.MiddleName}{" "}{this.state.LastName}</label> */}
                                        <input type="text" className="form-control" placeholder="username" style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} className="form-control" value={this.state.FirstName + "  " + this.state.MiddleName + "  " + this.state.LastName}
                                            name="" disabled />
                                    </div>
                                    <br />
                                    <div>
                                        <label >USER ROLE:</label>
                                        {/* <label>{this.state.userRole}</label> */}
                                        <select type="text" className="form-control" value={this.state.userRole}
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} disabled>
                                            <option value="AccessUser">AccessUser</option>
                                            <option value="Operator">Operator</option>
                                            <option value="Administrator">Administrator</option>
                                        </select>

                                    </div>
                                    <br />
                                    <div>
                                        <label >Date Of Birth:</label>
                                        {/* <label>{this.state.DateOfBirth}</label> */}
                                        <input type="text" className="form-control" value={this.state.DateOfBirth} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            ngLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div>
                                        <label >GENDER:</label>
                                        {/* <label>{this.state.Gender}</label> */}
                                        <input type="text" className="form-control" value={this.state.Gender} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label>AGE:</label>
                                        {/* <label>{this.state.Age}</label> */}
                                        <input type="text" className="form-control" value={this.state.Age} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />

                                    <div >
                                        <label >ADDRESS:</label>
                                        {/* <label>{this.state.AddressLine1}{"  "}{this.state.AddressLine2}{" "}{this.state.AddressLine3}</label> */}
                                        <input type="text" className="form-control" name=""
                                            value={this.state.AddressLine1 + " " + this.state.AddressLine2 + " " + this.state.AddressLine3} style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label >CITY:</label>
                                        {/* <label>{this.state.City}</label> */}
                                        <input type="text" className="form-control" value={this.state.City} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label >STATE:</label>
                                        {/* <label >{this.state.State}</label> */}
                                        <input type="text" className="form-control" value={this.state.State} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label>PIN CODE:</label>
                                        {/* <label>{this.state.PinCode}</label> */}
                                        <input type="text" className="form-control" value={this.state.PinCode} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div>
                                        <label>CONTACT NUMBER:</label>
                                        {/* <label>{this.state.PhoneNo}</label> */}
                                        <input type="text" className="form-control" value={this.state.PhoneNo} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label >MARITAL STATUS:</label>
                                        {/* <label>{this.state.MaritalStatus}</label> */}
                                        <input type="text" className="form-control" value={this.state.MaritalStatus} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label >EDUCATION STATUS:</label>
                                        {/* <label>{this.state.EducationStatus}</label> */}
                                        <input type="text" className="form-control" value={this.state.EducationStatus} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />
                                    <div >
                                        <label >PHYSICAL DISABILITY:</label>
                                        {/* <label>{this.state.PhysicalDisability}</label> */}
                                        <input type="text" className="form-control" value={this.state.PhysicalDisability} style={{
                                            width: ScreenWidth / 4, height: ScreenHeight / 20,
                                            paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                        }} disabled />
                                    </div>
                                    <br />

                                    <input type="button" value="Edit Profile" className="btn btn-default"
                                        onClick={this.editInfo.bind(this)} />
                                    {/* <input type="button" value="SAVE" class="btn btn-default" /> */}
                                </div>
                            }

                            {this.state.editProfile == true &&
                                <div className="container" style={{ marginTop: 20 }}>
                                    <div >
                                        <label >USER ID:</label>
                                        <input type="text" className="form-control" value={this.state.PersonalUniqueID}
                                            onChange={this.changed.bind(this)} style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} disabled />
                                    </div>
                                    <div>
                                        <label >Full Name: </label>

                                        {/* <label>{this.state.FirstName}{"  "}{this.state.MiddleName}{" "}{this.state.LastName}</label> */}
                                        <div style={{ display: "flex" }}>
                                            <input type="text" className="form-control"
                                                placeholder="First Name" name="FirstName" style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} className="form-control"
                                                value={this.state.FirstName}
                                                onChange={this.changed.bind(this)}
                                            />
                                            <input type="text" className="form-control"
                                                placeholder="Middle Name" name="MiddleName" style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} className="form-control"
                                                value={this.state.MiddleName}
                                                onChange={this.changed.bind(this)}


                                            />
                                            <input type="text" className="form-control"
                                                value={this.state.LastName}
                                                placeholder="Last Name" name="LastName" style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} className="form-control"
                                                value={this.state.LastName}
                                                onChange={this.changed.bind(this)}


                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <label >USER ROLE:</label>
                                        <select type="text" className="form-control"
                                            value={this.state.userRole}
                                            name="userRole"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} disabled
                                            onChange={this.changed.bind(this)}>
                                            <option value="AccessUser">AccessUser</option>
                                            <option value="Operator">Operator</option>
                                            <option value="Administrator">Administrator</option>
                                        </select>

                                    </div>
                                    <br />
                                    <div>
                                        <label >Date Of Birth:</label>
                                        <input type="text" className="form-control" value={this.state.DateOfBirth}
                                            name="DateOfBirth"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                ngLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} onChange={this.changed.bind(this)} />
                                    </div>
                                    <br />
                                    <div>
                                        <label >GENDER:</label>

                                        <select type="text" value={this.state.Gender}
                                            name="Gender" placeholder="Gender"
                                            onChange={this.changed.bind(this)}
                                            className="form-control"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                ngLeft: 10, paddingRight: 10, borderRadius: 50
                                            }}>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div >
                                        <label>AGE:</label>
                                        <input type="text" value={this.state.Age} className="form-control"
                                            onChange={this.changed.bind(this)} name="Age"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />

                                    <br />
                                    <div >
                                        <label>ADDRESS:</label>
                                        <div style={{ display: "flex" }}>
                                            <input type="text" className="form-control"
                                                onChange={this.changed.bind(this)} name="AddressLine1"
                                                value={this.state.AddressLine1}
                                                style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} />
                                            <input type="text" className="form-control"
                                                onChange={this.changed.bind(this)} name="AddressLine2"
                                                value={this.state.AddressLine2}
                                                style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} />
                                            <input type="text" className="form-control"
                                                onChange={this.changed.bind(this)} name="AddressLine3"
                                                value={this.state.AddressLine3}
                                                style={{
                                                    width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                    paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                                }} />
                                        </div>
                                    </div>
                                    <br />
                                    <div >
                                        <label >CITY:</label>

                                        <input type="text" className="form-control" onChange={this.changed.bind(this)}
                                            value={this.state.City} name="City" style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div >
                                        <label >STATE:</label>
                                        <input type="text" className="form-control" onChange={this.changed.bind(this)}
                                            value={this.state.State} name="State" style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div >
                                        <label>PIN CODE:</label>
                                        <input type="text" className="form-control" onChange={this.changed.bind(this)}
                                            value={this.state.PinCode} name="PinCode" style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div>
                                        <label>CONTACT NUMBER:</label>
                                        <input type="text" className="form-control" value={this.state.PhoneNo}
                                            onChange={this.changed.bind(this)} name="PhoneNo"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div >
                                        <label >MARITAL STATUS:</label>
                                        <input type="text" className="form-control" value={this.state.MaritalStatus}
                                            onChange={this.changed.bind(this)} name="MaritalStatus"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div >
                                        <label >EDUCATION STATUS:</label>
                                        <input type="text" className="form-control"
                                            name="EducationStatus"
                                            value={this.state.EducationStatus}
                                            onChange={this.changed.bind(this)}
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />
                                    <div >
                                        <label >PHYSICAL DISABILITY:</label>
                                        <input type="text" className="form-control"
                                            value={this.state.PhysicalDisability}
                                            onChange={this.changed.bind(this)}
                                            name="PhysicalDisability"
                                            style={{
                                                width: ScreenWidth / 4, height: ScreenHeight / 20,
                                                paddingLeft: 10, paddingRight: 10, borderRadius: 50
                                            }} />
                                    </div>
                                    <br />

                                    <input type="button" value="Save Updates" className="btn btn-default" onClick={() => this.updateData()} />
                                    {/* <input type="button" value="SAVE" class="btn btn-default" /> */}
                                </div>
                            }
                        </TabPane>
                    </TabContent>
                }
            </div>
        );
    }
    updateData() {
        var user = {
            PersonalUniqueID: this.state.PersonalUniqueID,
            PhysicalDisability: this.state.PhysicalDisability,
            EducationStatus: this.state.EducationStatus,
            MaritalStatus: this.state.MaritalStatus,
            PhoneNo: this.state.PhoneNo,
            PinCode: this.state.PinCode,
            State: this.state.State,
            City: this.state.City,
            Address: {
                AddressLine1: this.state.AddressLine1,
                AddressLine2: this.state.AddressLine2,
                AddressLine3: this.state.AddressLine3
            },
            Age: this.state.Age,
            DateOfBirth: this.state.DateOfBirth,
            Gender: this.state.Gender,
            FullName: {
                FirstName: this.state.FirstName,
                MiddleName: this.state.MiddleName,
                LastName: this.state.LastName
            },
            BirthSign: this.state.BirthSign,

        }
        var id = this.state.PersonalUniqueID;
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
                alert("Updated details sent to Admin for approval")
                console.log("Updated User details", JSON.stringify(resData.data))
            });


    }
    showDetails(userData) {
        console.log(JSON.stringify(userData));
        var data = {
            token: this.state.token,
            userRole: this.state.userRole,
            userData: userData
        }

        history.push('/adminactions', data);
    }

}

export default Profile;

