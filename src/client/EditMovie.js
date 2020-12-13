import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

//Edit Movie component that will edit the clicked on movie with passed id
class EditMovie extends Component {
    constructor(props) {
        super(props);
        // store the related to the movie information into the state
        // these should match the movie object from the API
        this.state = {
            year: 0,
            title: '',
            director:'',
            imdbCritic: 0.0,
            quote: '',
            picture: ''
        };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // fetch the related movie data
    componentDidMount() {
        // get the movies API and include the id which is passed via the URL and accessed via props
        axios.get('/api/movies/' + this.props.match.params.id)
            .then(response => {
                //on resonse set the state values to match empty state values set in the constructor
                this.setState({
                    _id: response.data._id,
                    year: response.data.year,
                    title: response.data.title,
                    director: response.data.director,
                    imdbCritic: response.data.imdbCritic,
                    quote: response.data.quote,
                    picture: response.data.picture,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //once the input boxes are changed, update the state to match the value
    handleChange(event) {
        //name of the input boxes must match the property names in the state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
        event.preventDefault();

        // use axios to send a PUT request to the server which includes the updated state information
        axios.put('/api/movies', this.state)
            //on success go to home
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // remember that the name of the input fields should match the state
        return (
            <div className="is-fluid">
                {/*on form submit call handleSubmit()*/}
                <form onSubmit={this.handleSubmit}>
                    <h2 className="year is-1 has-text-primary">Edit User</h2>
                    <hr />
                    {/*main container for input fields*/}
                    <div className="container">
                        {/*FIRST COLUMN*/}
                        <div className="columns">
                            <div className="column is-half">
                                <div className="field">
                                    <label className="label"> Year: </label>
                                    <div className="control">
                                        <input className="input is-small" type="Number" name="year" value={this.state.year} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Movie Title: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="title" value={this.state.title} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Director: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="director" value={this.state.director} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                
                                <div className="field">
                                    <label className="label"> Picture: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="picture" value={this.state.picture} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                            </div>
                            {/*SECOND COLUMN*/}
                            <div className="column">
                                <div className="field">
                                    <label className="label"> iMDb Critic: </label>
                                    <div className="control">
                                        <input className="input is-small" type="Decimal" name="imdbCritic" value={this.state.imdbCritic} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label"> Quote: </label>
                                    <div className="control">
                                        <input className="input is-small" type="text" name="quote" value={this.state.quote} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*SUBMIT BUTTON*/}
                        <input className="button is-primary" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditMovie;