import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Play extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            monster: 0,
            elite: 0,
            chest: 0,
            camp: 0,
            mapId: null,
            action: "create"
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount(){
        this.props.fetchAllMaps();
    }

    showCreate(){
        if (this.props.currentUserId){
            this.setState({ action: "create" });
            document.getElementById("map-form").classList.remove("hidden");
        } else {
            this.props.history.push("/login")
        }
    }

    showEdit(map){
        this.setState({
            name: map.name,
            monster: map.monster,
            elite: map.elite,
            chest: map.chest,
            camp: map.camp,
            mapId: map._id,
            action: "update"
        })
        document.getElementById("map-form").classList.remove("hidden");
    }

    resetForm(){
        this.setState({
            name: "",
            monster: 0,
            elite: 0,
            chest: 0,
            camp: 0,
            mapId: null
        })
        document.getElementById("map-form").classList.add("hidden");
    }

    handleInput(type) {
        return e => {
            if (type !== "name"){
                this.setState({ [type]: parseInt(e.target.value) })
            } else {
                this.setState({ [type]: e.target.value })
            }
        }
    }

    handleSubmit() {
        let func = this.props.createMap;
        const { name, monster, elite, chest, camp } = this.state;
        if (monster + elite + chest + camp === 9) {
            const formData = {
                name: name,
                user: this.props.currentUserId,
                monster: monster,
                elite: elite,
                chest: chest,
                camp: camp,
            };
            if (this.state.action === "update") {
                formData.id = this.state.mapId;
                func = this.props.updateMap;
            }
            func(formData).then( this.resetForm );
        } else {
            console.log("please enter valid map params")
        }
    }

    handleDelete(id){
        this.props.deleteMap(id);
    }

    render() {

        return (
            <div>
                <div>SELECT MAP TO PLAY</div>
                <button onClick={this.showCreate} className="btn">Create New Map</button>
                <div>
                    <ul>
                        {this.props.maps.map( map => {
                            return (
                            <li key={map._id}>
                                <p>{map.name}</p>
                                    <Link to={`map/${map._id}`}><button className="btn">Play</button></Link>
                                    {map.user === this.props.currentUserId ? 
                                        <div>
                                            <button onClick={() => this.showEdit(map)} className="btn">Edit</button>
                                            <button onClick={() => this.handleDelete(map._id)} className="btn">Delete</button>
                                        </div> : null}
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="map-form hidden" id="map-form">
                    <div>
                        <h2>Create new map by setting numbers of following parameters:</h2>
                        <h3>Note: total number must add up to 9</h3>
                        <label>Map Name
                            <input type="text" value={this.state.name} onChange={this.handleInput("name")} />
                        </label>
                        <label>Monster
                            <input type="number" value={this.state.monster} onChange={this.handleInput("monster")} />
                        </label>
                        <label>Elite
                            <input type="number" value={this.state.elite} onChange={this.handleInput("elite")} />
                        </label>
                        <label>Chest
                            <input type="number" value={this.state.chest} onChange={this.handleInput("chest")} />
                        </label>
                        <label>Camp
                            <input type="number" value={this.state.camp} onChange={this.handleInput("camp")} />
                        </label>
                        <button type="button" className="btn" onClick={this.handleSubmit}>{"Submit"}</button>
                    </div>
                </div>
            </div>
        )
    }
}
