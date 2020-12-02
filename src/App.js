import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pincode from 'react-pin-input';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pincode: "",
      city: "",
      district: "",
      state: "",
      error: ""
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length === 6) {
      this.setState({
        error: ""
      });
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then(res =>
          this.setState({
            state: res.data[0].PostOffice[0].State,
            city: res.data[0].PostOffice[0].Block,
            district: res.data[0].PostOffice[0].District
          })
        )
        .then(() => {
          document.getElementById("pincode").classList.remove("error");
        })
        .catch(err => {
          document.getElementById("pincode").className = "error";
          this.setState({
            error: "Invalid PIN Code"
          });
        });
    }
    if (e.target.value.length !== 6) {
      this.setState({
        city: "",
        district:"",
        state: "",
        error: "ZIP code must be of 6 digits"
      });
    }
  }
  render() {
    return (
      
      <div style={this.props.Container} class="outer_box">
        {this.state.error ? (
          <span className="error-display">{this.state.error}</span>
        ) : null}
        <div style={this.props.pincodeContainer} class="group">
          <label>Pin code</label>
          <input maxLength={6} minLength={6}
            onChange={e => this.onChange(e)}
            name="pincode"
            placeholder=" "
            value={this.state.pincode}
            id="pincode"
            type="number"
            style={this.props.pincodeInput}
            class="pin"
            required
          />
          <span class="highlight"></span>
          
        </div>
        <div style={this.props.cityContainer} class="group">
          <label>City</label>
          <input
            type="String"
            readonly
            placeholder=" "
            value={this.state.city}
            style={this.props.cityInput}
            class="inp"
            required
          />
          
        </div>
        <div style={this.props.districtContainer} class="group">
          <label>District</label>
          <input type="String" placeholder=" " readonly value={this.state.district} style={this.props.districtInput} class="inp"
            required  />
          
        </div>
        <div style={this.props.stateContainer} class="group">
          <label>State</label>
          <input
            type="String"
            placeholder=" "
            readonly
            value={this.state.state}
            style={this.props.stateInput}
            class="inp"
            required
          />
          
        </div>
        <h4>Enter 6-digit Pincode</h4>
      </div>
    );
  }
}
ReactDOM.render(<Pincode />, document.getElementById("root"));

export default App;