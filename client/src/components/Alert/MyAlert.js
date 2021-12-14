import React from "react";
import Alert from "@mui/material/Alert";
export class MyAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alertId: "",
    };
  }

  render() {
    return (
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
    );
  }
}
