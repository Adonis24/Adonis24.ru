import React, { Component } from "react";
import JsonData from './data.json'
const data = JsonData;
export class Landing extends Component {
    state = {
        landingPageData: {},
      }
      getlandingPageData() {
        this.setState({landingPageData : JsonData})
      }
    
      componentDidMount() {
        this.getlandingPageData();
      }
  render() {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {data.Header.title ? data.Header.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>
                    {data.Header ? data.Header.paragraph : "Loading"}
                  </p>
                  <a
                    href="#features"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Подробнее
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Landing;
