import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";

import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tenants: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const tenants = await this.tenants();
      this.setState({ tenants });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  tenants() {
    return API.get("tenants", "/tenants");
  }

  handleTenantClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderTenantsList(tenants) {
    return [{}].concat(tenants).map(
      (tenant, i) =>
        i !== 0
          ? <LinkContainer
              key={tenant.tenantId}
              to={`/tenants/${tenant.tenantId}`}
            >
              <ListGroupItem header={tenant.content.trim().split("\n")[0]}>
                {"Created: " + new Date(tenant.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/tenants/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new Tenant
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLanding() {
    return (
      <div className="landing">
        <h1>TurtleDB - POC</h1>
        <p>A simple POC for testing TurtleDB</p>
      </div>
    );
  }

  renderTenants() {
    return (
      <div className="tenants">
        <PageHeader>All Tenants</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderTenantsList(this.state.tenants)}
        </ListGroup>
      </div>
    );
  }


  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTenants() : this.renderLanding()}
      </div>
    );
  }
}