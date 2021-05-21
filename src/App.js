import React, {Component} from 'react';
import { CardList } from './components/card-list/card-list.component';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = {
            pokemons : [],
            page: 50,
        };
    }


    componentDidMount(){


        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(response => response.json())
        .then(name => this.setState({pokemons:name.results}));
    }

    
    handleClick = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${this.state.page}`)
            .then((response) => response.json())
            .then((name) => {
                const showMore = [...this.state.pokemons, ...name.results ]
                this.setState({ ...this.state, page: this.state.page+50, pokemons: showMore });
            });
    }


    render(){
        const { pokemons } = this.state;

        return(
            <div className="App">
                <CardList pokemons={pokemons}></CardList>
                <button onClick={this.handleClick}>50+</button>
            </div>
            
        );
    }
}

export default App;
