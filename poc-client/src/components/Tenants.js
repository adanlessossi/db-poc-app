import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Tenants.css";

export default class Tenants extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: null,
        isDeleting: null,
        tenant: null,
        content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }
  
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveTenant(tenant) {
    return API.put("tenants", `/tenants/${this.props.match.params.id}`, {
      body: tenant
    });
  }
  
  handleSubmit = async event => {  
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
  
      await this.saveTenant({
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  deleteTenant() {
    return API.del("tenants", `/tenants/${this.props.match.params.id}`);
  }
  
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });  
    try {
      await this.deleteTenant();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }
  
  render() {
    return (
      <div className="Tenants">
        {this.state.tenant &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="input"
              />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}