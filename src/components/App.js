// React
import React from 'react';
import Header from './Header';
import Admin from './Admin';
import Card from './Card';
// Firebase
import base from '../base.js';

//Charger els recettes depuis fichier JS
import recettes from '../recettes'

class App extends React.Component {

	state = {
		recettes: {}
	};

	componentWillMount() {
		this.ref = base.syncState( `${this.props.params.pseudo}/recettes`, {
			context: this,
			state: 'recettes'
		} )
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	chargerExemple = () => {
		this.setState ({ recettes });
	};

	ajouterRecette = (recette) => {
		const recettes = {...this.state.recette};
		const timestamp = Date.now();
		recettes[ `recette-${timestamp}` ] = recette;
		this.setState({ recettes });
	};

	majRecette = (key, majRecette) => {
		const recettes = {...this.state.recettes};
		recettes[key] = majRecette;
		this.setState({ recettes });
	};

	supprimerRecette = key => {
		const recettes = {...this.state.recettes};
		recettes[key] = null;
		this.setState({ recettes });
	};

	render() {

		const cards = Object
		.keys(this.state.recettes)
		.map(key => <Card key={key} details={this.state.recettes[key]} />);

		return (
			<div className="box">
				<Header pseudo={this.props.params.pseudo} />
				<h2 className="indications">Retrouve toutes les recettes que tu as déjà ajoutées!</h2>
				<div className="cards">
					{cards}
				</div>
				<h2 className="indications">Ici tu trouveras dans le cadre rouge, de quoi remplir une nouvelle recette, et l'ajouter à ta boite à recettes. Dans les cadres verts, tu retrouveras tes recettes ajoutées. <br/> Tu pourras ainsi les supprimer, ou les modifier.</h2>
				<Admin 
				recettes={this.state.recettes}
				chargerExemple={this.chargerExemple} 
				ajouterRecette={this.ajouterRecette} 
				majRecette={this.majRecette} 
				supprimerRecette={this.supprimerRecette}
				pseudo={this.props.params.pseudo}
				/>
			</div>
		)
	}

	static propTypes = {
	  params: React.PropTypes.object.isRequired
	};
}

export default App;