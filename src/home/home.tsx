import React, { Component } from 'react';
import NoteContainer from '../noteContainer/noteContainer';
import "./home.scss";
import searchIcon from "../image/search.svg";
// import { useSelector, useDispatch } from 'react-redux';

export interface INotesData{
    id: string;
    title: string;
    details: string;
    color: string
}

export interface IHome{
    searchText: string;
    notesData: Array<INotesData>
}


export default class Home extends Component {
    state: IHome = {
        searchText: "",
        notesData:  [],
    }

    componentDidMount(){
        const currentdata = JSON.parse(localStorage.getItem('noteData') || '[]');
        const current = JSON.parse(localStorage.getItem('creteNote-data') || '[]');
        localStorage.setItem('selectedServers', JSON.stringify(currentdata.concat(current)));
        const x = JSON.parse(localStorage.getItem('selectedServers') || '[]');
        const UniqeFliter = x.filter((a: any, i: any) => x.findIndex((s: any) => a.id === s.id) === i)
        this.setState({
            notesData : UniqeFliter
        })
    }


    createNote(){
        localStorage.setItem( "selectedServers", JSON.stringify( this.state.notesData ) );
        ( this.props as any ).history.push( "/create/note" );
    }

    AddNote(){
        const x: any= [...this.state.notesData];
        x.push({
            id: Date.now() + "" + Math.floor(Math.random() * 78),
            title: "",
            details: "",
            color: "#" + ((1<<24)*Math.random() | 0).toString(16)
        });
        this.setState({
            notesData: x,
            // notesData: this.state.notesData.concat(x)
        })
        localStorage.setItem('noteData',  JSON.stringify(x) );
    }

    handelSearchNote = (event: any) => {
        this.setState({
            searchText: event
        })
    }

    deleteNote = (id : any) => {
       const tempNotes:any = [...this.state.notesData]
        const index = tempNotes.findIndex((item: any) => item.id === id)
        if(index < 0 ) return;
        tempNotes.splice(index, 1)
        this.setState({
            notesData: tempNotes
        })
        localStorage.setItem('noteData',  JSON.stringify( tempNotes) );
        localStorage.setItem( "creteNote-data", JSON.stringify( tempNotes ) );
    }

    reverseArray = (arr: any) => {
        const array = [];
        for(let i = arr.length -1; i >= 0; --i){
            array.push(arr[i])
        }
        return array;
    }

    updateTitle = (text: any, id: any) => {
        const tempNotes:any = [...this.state.notesData]
        const index = tempNotes.findIndex((item: any) => item.id === id)
        if(index < 0 ) return;

        tempNotes[index].title = text;
        this.setState({
            notesData: tempNotes
        })
        console.log(tempNotes, id)
        localStorage.setItem('noteData',  JSON.stringify( tempNotes ) );
    }

    updateDetails = (text: any, id: any) => {
        const tempNotes:any = [...this.state.notesData]
        const index = tempNotes.findIndex((item: any) => item.id === id)
        if(index < 0 ) return;

        tempNotes[index].details = text;
        this.setState({
            notesData: tempNotes
        })
        console.log(tempNotes, id)
        localStorage.setItem('noteData',  JSON.stringify( tempNotes ) );
    }

    render() {
        const notesData = this.reverseArray( this.state.notesData)
        return (
            <div className="row" style={{height:"100vh", overflow:"hidden"}}>
                <div className="app-router">
                    <div className="col-12" style={{fontWeight:"bolder", fontSize:"25px", textDecoration:"underline"}}>Simple Notes App</div>
                    <div style={{marginBottom:"10px", paddingTop:"25px"}}></div>
                    <div className="row">
                        <div className="col-4">
                            <button onClick={() => {this.createNote()}}>Create Note</button>
                            <div style={{paddingTop:"15px", fontSize:"14px"}}>Note:-<span> Create new Notes with Costmize Note Color cards</span></div>
                        </div>
                        <div className="col-4">
                            <button onClick={() => {this.AddNote()}}>+ Add Notes</button>
                            <div style={{paddingTop:"15px", fontSize:"14px"}}>Note:-<span> Add new Empty Note with Random Note Color card</span></div>
                        </div>
                        <div className="col-4">
                            <div className="input-holder ">
                                <img src={searchIcon} alt="search icon" className="searchIcon"/>
                                <input maxLength={30} className="app-input" onChange={(event) => {this.handelSearchNote(event.target.value)}} type= "text" placeholder="type to search..."/>
                            </div>
                            <div style={{paddingTop:"15px", fontSize:"14px"}}>Note:-<span> Enter Note title Name for Search Notes.</span></div>
                        </div>
                    </div>
                </div>
                <div className="row note-container">
                    <div className=" heading_text">Notes</div>
                    <div className="col-12 note-container_notes" style={{paddingLeft:"50px", paddingTop:"15px", marginTop:"-23%"}}>
                        { notesData.length > 0 ? notesData.filter((items) => items.title.toLowerCase().includes(this.state.searchText)).map((items) => {return(
                            <NoteContainer
                                notesItems= {items}
                                deleteNote={this.deleteNote}
                                updateTitle={this.updateTitle}
                                updateDetails={this.updateDetails}
                            />
                        )}) : <div style={{paddingLeft:"20px"}}>No Notes Presents...!!!</div>}
                    </div>
                </div>
            </div>
        )
    }
}
