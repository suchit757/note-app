import React from 'react';
import  "./createNote.tsx";



export interface INotesData{
    id: string;
    title: string;
    details: string;
    color: string
}

export interface ICreateNote {
    value: string
    notesData: Array<INotesData>
}

export default class CreateNote extends React.Component {

    state: ICreateNote = {
        value:"",
        notesData:  [],
    }

    componentDidMount(){
        const current = JSON.parse(localStorage.getItem('creteNote-data') || '[]');
        this.setState({
            notesData : current
        })
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
      }

    noteCancel(){
        ( this.props as any ).history.push( "/" );
    }

    noteAdd(){
        let  z: any = [...this.state.notesData];
        const x = document.getElementsByTagName( "input" );
        const y = document.getElementsByTagName( "textarea" );
        z.push({
            id: Date.now() + "" + Math.floor(Math.random() * 78),
            title: `${x[0].value}`,
            details: `${y[0].value}`,
            color: `${this.state.value}`
        })
        this.setState({ notesData: z })
        localStorage.setItem( "creteNote-data", JSON.stringify( z ) );
        ( this.props as any ).history.push( "/" );
    }


    handleChange(event : any) {
        this.setState({value: event.target.value});
      }

    render() {
        return (
            <div className="row app-router" style={{height:"100vh"}}>
                <div className="col-xl-5 offset-xl-3 block" style={{background:"white", padding:"25px", height:"60%", marginTop:"5%"}}>
                <div className="col-12" style={{fontWeight:"bolder", fontSize:"25px", textDecoration:"underline", }}>Add A Note</div>
                <div style={{marginBottom:"15px", paddingTop:"10px"}}>To add a note start typing here...</div>
                    <div className="row">
                        <div className="col-12">
                            <div style={{marginLeft:"-65%", fontSize:"16px", fontWeight:"bold"}}>Title</div>
                            <input style={{width:"50vh",  paddingLeft:"10px"}} maxLength={30} placeholder="type title...."/>
                            <h4 className="text-status" style={{
                                fontSize: "11px",
                                marginLeft: "38%",
                                color: "red",
                            }} > Note:- (More than 30 character not allowed)</h4>
                        </div>
                        <div className="col-12" style={{paddingTop:"15px"}}>
                            <div style={{marginLeft:"-63%", fontSize:"15px", fontWeight:"bold"}}>Details</div>
                            <textarea style={{width:"50vh", height:"17vh", resize:"none", paddingLeft:"10px"}} placeholder="type details...."/>
                        </div>
                    </div>
                    <div style={{marginLeft:"-23%", paddingTop:"15px"}}>
                        <form>
                            <label>Select Color for Notes card design:- </label>
                            <select value={this.state.value} onChange={this.handleChange}>
                            <option >select color</option>
                                <option value="tomato">Red</option>
                                <option value= "teal">Green</option>
                                <option value= "yellow">yellow</option>
                                <option value= "cadetblue">Blue</option>
                                <option value= "burlywood">Brown</option>
                            </select>
                        </form>
                    </div>
                    <div style={{paddingTop:"25px", paddingLeft:"55%"}}>
                        <button style={{marginRight:"15px"}} onClick={() => {this.noteCancel()}}>Cancel</button>
                        <button style={{marginRight:"15px"}} onClick={() => {this.noteAdd()}}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}
