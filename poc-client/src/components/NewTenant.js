import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API } from "aws-amplify";

import config from "../config";
import "./NewTenant.css";

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      name: ""
    };
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await this.createTenant({
        name: this.state.name
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  createTenant(tenant) {
    return API.post("tenants", "/tenants", {
      body: tenant
    });
  }

  render() {
    return (
      <div className="NewTenant">
        <form onSubmit={this.handleSubmit}>
        <FieldGroup
            id="formControlsText"
            type="text"
            label="Tenant Name:"
            placeholder="Enter text"
            />
            <FieldGroup
            id="formControlsEmail"
            type="email"
            label="Tenant Email address"
            placeholder="Enter email"
            />
            <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />      
        </form>
      </div>
    );
  }
}