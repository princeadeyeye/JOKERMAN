import React, { Component } from 'react';
import axios from 'axios';
import './JokeList.css'
import Joke from './Joke'
import uuid from 'uuid/v4'
class JokeList extends Component {

	static defaultProps = {
		numJokesToGet : 10
	}
    constructor(props) {
        super(props);
        this.state = { 
        jokes: JSON.parse(window.localStorage.getItem("jokes") || '[]'), 
        loading:false,
    }
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));

}
    async componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
  }
  
  async getJokes() {
    try {
        let jokes = [];
        while(jokes.length < this.props.numJokesToGet) {
            const res = await axios.get('https://icanhazdadjoke.com/', {
            headers: {Accept: 'application/json'}
        });
            let newJoke = res.data.joke
            if (!this.seenJokes.has(newJoke)) {
                jokes.push({id: uuid(), text: newJoke, votes : 0})
            } else {
                console.log("FOUND A DUPLICATE")
                console.log(newJoke)
            }
        
        }
        this.setState(st => ({
            loading: false,
            jokes: [...st.jokes, ...jokes]
        }),
        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes) )
        )
    } catch (e) {
        alert(e)
        this.setState({ loading: false })
    }
    

  }      
    	 
handleVote (id, delta ) {
    this.setState(
        st => ({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta} : j
            )
        }),

        () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes) )
    )
}

    handleClick = () => {
        this.setState({ loading: true }, this.getJokes)
    }

    render() {
        if (this.state.loading) {
            return (
                <div className='JokeList-spinner'>
                    <i className='fa fa-8x fa-laugh fa-spin' />
                    <h1 className='JokeList-title'>LOADING...</h1>
                </div>
            )
        }
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
        return (
        	<div className= 'JokeList'>
        	<div className='JokeList-sidebar'>
        		<h1 className='JokeList-title'>
        		<span>Dad</span>Jokes
        		</h1>
        		<img alt='imojiImage' src="https://assets.dryicons.com/uploads/icon/svg/8848/2e138a26-0f01-4fdf-b058-17659f447e76.svg" />
        		<button 
                className='JokeList-getmore'
                onClick={this.handleClick}
                >
                New Jokes
                </button>
        	</div>
        		<h1 className='JokeList-jokes'>
        			{jokes.map(j => (
        			<Joke 
        				key={j.id} 
        				votes={j.votes} 
        				text={j.text}
        				upvote = {() => this.handleVote(j.id, 1)}
        				downvote = {() => this.handleVote(j.id, -1)}
        			/>
        			))}
        		</h1>
              </div>
            
        );
    }
}

export default JokeList;
