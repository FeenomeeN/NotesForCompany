import { Dispatch } from 'redux';
const ADD_NOTE = 'ADD_NOTE'
const EDIT_NOTE = 'EDIT_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'


const initialState = require('./data.json')

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type ActionType =
  | Action<'ADD_NOTE', { text: string, title: string }>
  | Action<'EDIT_NOTE', { text: string, title: string, id: number }>
  | Action<'DELETE_NOTE', { id: number}>

interface Notes {
    id: number,
    text: string,
    title: string,
}


const notesReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_NOTE: 
            return {
                ...state,
                notes: [...state.notes, {id: state.notes.length + 1, text: action.text, title: action.title}]
            }
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map((el: Notes) => {
                    if (el.id === action.id) {
                        el.text = action.text
                        el.title = action.title
                    }
                    return el 
                } )
            }
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((el: Notes) => {
                    return el.id !== action.id
                })
            }    
        default: 
            return state
    }
}

const setNote = (id: number, text: string , title: string )  => {
    return {
        type: EDIT_NOTE,
        id,
        text,
        title
    }
}

const deleteElement = (id: number ) => {
    return {
        type: DELETE_NOTE,
        id
    }
}

const addElement = (text: string, title: string ) => {
    return {
        type: ADD_NOTE,
        text,
        title
    }
}

export const updateNote = (id: number, text: string , title: string ) => {
    return (dispatch: Dispatch) => {
        dispatch(setNote(id, text, title))
    }
}

export const deleteNote = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(deleteElement(id))
    }
}

export const addNote = (text: string, title: string ) => {
    return (dispatch: Dispatch) => {
        dispatch(addElement(text, title))
    }
}

export default notesReducer