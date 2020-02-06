import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./play.css";
import ReactModal from 'react-modal';

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
            action: "create",
            showForm: false,
            errorMessage: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount(){
        this.props.fetchAllMaps();
        ReactModal.setAppElement('body');
    }

    showCreate(){
        if (this.props.currentUserId){
            this.setState({ action: "create" });
            this.resetForm();
            this.handleOpenModal();
            // document.getElementById("map-form").classList.remove("hidden");
        } else {
            this.props.history.push("/login")
        }
    }

    showEdit(mapId){
        const map = this.findMapByID(mapId);
        this.setState({
            name: map.name,
            monster: map.monster,
            elite: map.elite,
            chest: map.chest,
            camp: map.camp,
            action: "update"
        })
        // document.getElementById("map-form").classList.remove("hidden");
        this.handleOpenModal();

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
        // document.getElementById("map-form").classList.add("hidden");
        this.handleCloseModal();
    }

    handleInput(type) {
        return e => {
            this.setState({errorMessage: ""})
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
            this.setState({ errorMessage: "please enter valid map params"});
        }
    }

    handleDelete(id){
        this.props.deleteMap(id);
        this.setState({mapId: null});
    }

    handleSelect(e){
        document.getElementById("map-form").classList.add("hidden");
        this.setState({mapId: e.target.value});
        console.dir(this.state)
    }

    findMapByID(id){
        return this.props.maps.filter(map => (map._id === id))[0];
    }

    handleOpenModal() {
        this.setState({ showForm: true });
    }

    handleCloseModal() {
        this.setState({ showForm: false });
    }

    render() {
        const buttons = this.state.mapId ? (
            this.props.currentUserId === this.findMapByID(this.state.mapId).user ? (
                <div className="list-btn-frame">
                    <Link to={`map/${this.state.mapId}`}><button className="play-btn btn">Play</button></Link>
                    <button onClick={() => this.showEdit(this.state.mapId)} className="play-btn btn">Edit</button>
                    <button onClick={() => this.handleDelete(this.state.mapId)} className="play-btn btn">Delete</button>
                </div>
            ) : 
                <div className="list-btn-frame">
                    <Link to={`map/${this.state.mapId}`}><button className="play-btn btn">Play</button></Link>
                </div>
            ) : null;

        return (
            <div className="play-frame">
                <h1 className="play-title">Terminate the Tower</h1>
                <h2>Select a map to play</h2>
                <div className="map-list-frame">
                    <select className="map-list" defaultValue="" onChange={this.handleSelect}>
                        <option key="" value="" disabled={true}>--- Select a Map ---</option>
                        {this.props.maps.map( map => {
                            return (
                            <option key={map._id} value={map._id}>
                                {map.name}
                            </option>)
                        })}
                    </select>
                    {buttons}
                </div>
                <h2>or</h2>
                <div>
                    <button onClick={this.showCreate} className="play-btn btn">Create New Map</button>
                </div>
                <div className="map-form-frame hidden" id="map-form">

                </div>
                <ReactModal
                    isOpen={this.state.showForm}
                    contentLabel="Form Modal"
                    className="form-modal"
                    overlayClassName="message-modal-overlay"
                >
                    <div className="form">
                        <h2 className="form-desc">Create new map by setting numbers of following parameters:</h2>
                        <h3 className="form-note">Note: total number must add up to 9</h3>
                        <label>Map Name
                            <input type="text" className="form-input" value={this.state.name} onChange={this.handleInput("name")} />
                        </label>
                        <br />
                        <label>Monster
                            <input className="form-input" type="number" value={this.state.monster} onChange={this.handleInput("monster")} />
                        </label>
                        <br />
                        <label>Elite
                            <input className="form-input" type="number" value={this.state.elite} onChange={this.handleInput("elite")} />
                        </label>
                        <br />
                        <label>Chest
                            <input className="form-input" type="number" value={this.state.chest} onChange={this.handleInput("chest")} />
                        </label>
                        <br />
                        <label>Camp
                            <input className="form-input" type="number" value={this.state.camp} onChange={this.handleInput("camp")} />
                        </label>
                        <br />
                        <div>
                            <button type="button" className="play-btn btn" onClick={this.handleSubmit}>{"Submit"}</button>
                            <button type="button" className="play-btn btn" onClick={this.handleCloseModal}>{"Close"}</button>
                        </div>
                        <div>
                            <p className="form-error">{this.state.errorMessage}</p>
                        </div>
                    </div>
                </ReactModal>
            </div>
        )
    }
}
