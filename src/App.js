import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./components/loader";
import { Card, Button } from "react-bootstrap";

class App extends Component {
  state = {
    advice: "",
    count: Math.floor(Math.random() * 10 + 1),
    id: 0,
    isLoading: false,
  };

  componentDidMount() {
    console.log("mount");
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    this.setState({ count: this.state.count + 1, isLoading: true });

    axios
      .get(`https://api.adviceslip.com/advice/${this.state.count}`)
      .then((response) => {
        let ans = response.data + "}";
        let data = JSON.parse(ans);
        console.log(data);
        this.setState({
          advice: data.slip.advice,
          isLoading: false,
        });
      })

      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading, advice } = this.state;
    console.log("render");
    console.log(advice);

    return (
      <div className="App">
        <Card className="card1">
          {isLoading ? <Loader /> : <h2 className="heading">{advice}</h2>}
          <Button className="advice-btn" onClick={this.fetchAdvice}>
            Give Me Advice !
          </Button>
        </Card>
      </div>
    );
  }
}

export default App;
