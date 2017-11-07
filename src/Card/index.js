import React, {Component} from 'react';
import './card.css';
import PropTypes from 'prop-types';

export default class Card extends Component {

    static propTypes = {
        backgroundImage: PropTypes.string
    };

    render() {
        const {backgroundImage} = this.props;
        return (
            <div className="card-container">
                <div className="color-panel" style={{backgroundImage}}/>
                <div className="label-panel">
                    {this._handleValue(backgroundImage)}
                </div>
            </div>
        );
    }

    _handleValue(backgroundImage) {
        const start = backgroundImage.indexOf('(');
        const end = backgroundImage.indexOf(')');
        const substr = backgroundImage.substr(start + 1, end - start - 1);
        return substr.split(',').map((item, i)=>{
            return <span key={i}>{item.trim()}</span>
        })
    }
}