
const initialState = 0;

const PassThevalue = (state = initialState, action: any) => {
    switch(action.type) {
        case "submitNotes": return state;
        case "CanNotes": return state;
        default: return state
    }
}

export default PassThevalue;