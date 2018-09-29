import React from 'react';

class Header extends React.Component {
    convertirPseudo = (pseudo) => {
        return /[aeiuoy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`
    };

    render() {
        return (
            <header>
                <h1>La boite à recettes {this.convertirPseudo(this.props.pseudo)}</h1>
            </header>
        )
    }

    static propTupes = {
        pseudo: React.PropTypes.string.isRequired
    }
}

export default Header;


