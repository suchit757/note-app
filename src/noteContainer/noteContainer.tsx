import React from 'react';
import "./noteConatiner.scss";
import deleteIcon from "../image/bin.svg"


export interface INoteContainerProps extends React.ClassAttributes<NoteContainer> {
    notesItems: {};
    deleteNote: (id: any) => void;
    updateTitle: (textValue: any, id: any) => void;
    updateDetails: (textValue: any, id: any) => void
}


export default class NoteContainer extends React.Component<any, INoteContainerProps> {


    render() {
        return (
            <div className="noteConatiner-css row" style={{backgroundColor: this.props.notesItems.color}} key={this.props.notesItems.id}>
                <div className="col-12">
                    <div className="text_css">Title</div>
                    <input placeholder="type title...." onChange={(event) => this.props.updateTitle(event.target.value, this.props.notesItems.id)} className= "noteConatiner-css_title" defaultValue={this.props.notesItems.title} maxLength={30}/>
                </div>
                <div className="col-12" style={{paddingTop:"5px"}}>
                    <div className="text_css">Details</div>
                    <textarea placeholder="type details...." onChange={(event) => this.props.updateDetails(event.target.value, this.props.notesItems.id)} className="noteConatiner-css_details" defaultValue={this.props.notesItems.details}/>
                </div>
                <img src= {deleteIcon} alt="delete" className="delete_css" onClick= {() => {this.props.deleteNote(this.props.notesItems.id)}}/>
            </div>
        )
    }
}
