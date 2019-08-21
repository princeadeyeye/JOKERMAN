import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component {
    
    getColor() {
        if(this.props.votes >= 15) {
            return '#4caf50';
        } else if (this.props.votes >=9) {
            return '#8bc34a'
        } else if (this.props.votes >=6) {
            return '#cddc39'
        }else if (this.props.votes >=3) {
            return '#ffc107'
        }else if (this.props.votes >=0) {
            return '#ff9800'
        } else {
            return '#f44336'
        }
    }

    render() {
        return (
        	<div className='Joke'>
        		<div className='Joke-buttons'>
        			<i className='fa fa-arrow-up'onClick={this.props.upvote} />
                    <span className='Joke-votes' style={{ borderColor: this.getColor() }}>{this.props.votes}</span>
        			<i className='fa fa-arrow-down'onClick={this.props.downvote} />
        		</div>
        		<div className='Joke-text'> {this.props.text}</div>
        	</div>
            
        );
    }
}

export default Joke;
