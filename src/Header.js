import  React, {Component} from 'react';
import NavLink from 'react-router-dom';
import './index.css';

class Header extends Component{

    headerStyle = {
        backgroundColor: "#2C2C3B",
        width: "100%",
        height: "136px"
    }

    spanStyle = {
        textAlign: 'center',
        color: '#E5E7EE',
        position: 'relative',
        top: '50px',
        fontSize: '38px'   
    }


    render(){
        return(
            <header style={this.headerStyle}>
                <div style={this.spanStyle}>AlarmMe</div>
            </header>
        );

    }




}

export default Header;