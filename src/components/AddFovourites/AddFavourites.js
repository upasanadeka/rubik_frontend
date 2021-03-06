import React, { Component } from "react";
import axios from "axios";
import "./AddFavourites.css";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

class AddFavourites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addFavourites: {
        accountName: "",
        accountNumber: "",
        bankName: "",
        customerId: localStorage.getItem("customerId"),
        bankId:localStorage.getItem("bankId"),
      
      }
    };
  }

  handleChange = event => {
    const { addFavourites } = this.state;
    addFavourites[event.target.name] = event.target.value;
    this.setState({ addFavourites });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { addFavourites } = this.state;
    console.log(addFavourites);
    axios
      .post(config.url + "favourite/", addFavourites)
      .then(response => {
        console.log(response.data);
        swal(response.data.message);
        this.props.history.push('/listOfFavourites');
      })
      .catch(error => {
        swal(error.response.data.message);
      });
  };
  handleBankName = (event) => {
    if (event.target.value.length == 20) {
      axios
        .post(
          config.url + "bankDetails/" + this.state.addFavourites.accountNumber
        )
        .then(response => {
          console.log(response.data);
          this.setState({ bankName: response.data.bankName });
         localStorage.setItem("bankId",response.data.bankId);
       console.log(response.data.bankId)

        })
        .catch(error => {
          console.log(error);
          swal(error.response.data.message);
        });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-sm-12 col-md-4 col-md-offset-4">
            <div>
              <h3 className="col-md-12 col-sm-3 text-center login-title">
                Add Favourite account
              </h3>
            </div>

            <div>
              <form className="form-signin">
                <label>Account Name</label>
                <input
                  type="text"
                  id="accountName"
                  name="accountName"
                  className="form-control user-field"
                  placeholder="Enter the Account name"
                  onChange={this.handleChange}
                  required
                  autoFocus
                />
                <div onChange={this.handleBankName}>
                  <label>IBAN/Account Number</label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    className="form-control user-field"
                    placeholder="Enter the IBAN/ Account number"
                    onChange={this.handleChange}
                    required
                    autoFocus
                  />
                </div>
                <label>Bank</label>
                <input
                  type="text"
                  id="bankName"
                  value={this.state.bankName}
                  name="bankName"
                  className="form-control user-field"
                  placeholder="Enter the bank"
                  onChange={this.handleChange}
                  required
                  autoFocus
                  disabled
                />

                <button
                  id="btn2"
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default AddFavourites;
