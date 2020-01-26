import React from 'react';
import Login from './Login'
import Visualizer from './Visualizer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggedin: true,
        searchValue: '',
        start: '',
        end: '',
        tickers: []

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }
  
  handleChange(e) {
    // console.log("HandleDateTrigger")
    console.log(e.target.getAttribute('field'))  
    const newState = {};
    const field =  e.target.getAttribute('field');
    newState[field] = e.target.value; 

    this.setState (
      newState
    )
    console.log(this.state[field]);

  }
  handleSubmit(e) {
    console.log("hello")
    e.preventDefault();
 

    const url = `route/?ticker=${this.state.searchValue}&start=${this.state.start}&end=${this.state.end}`
    console.log(url);
    fetch(url)
      .then(response => 
        response.json())
      .then((data) => {
      this.setState({
        tickers:data
       

      })
})
  
  } 
    render() {
      // console.log('props from app:', this)
      if(!this.state.isLoggedin) {
      return (
        <div>
          <Login/>
        </div>
         )
      }
      return (

        <div>
        <Visualizer
          app = {
           {searchValue: this.state.searchValue,
            satrt:this.state.start,
            end:this.state.end,
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            tickers:this.state.tickers
           }
          }
        />
      </div>
      )
    }
  }