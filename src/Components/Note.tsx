import { number } from 'prop-types'
import { useState, useEffect } from 'react'
import styles from './Note.module.scss'

// interface Props {
//     data: {
//         text: string,
//         title: string,
//         id: number
//     },
//     add: boolean,
//     addNote: (text: string, title: string) => void,
//     setAdd: (t :boolean) => void,
// }

export default function Note(props: any) {
    console.log(props)

    const [editMode, setEditMode] = useState(false)
    const [text, setNote] = useState(props.data ? props.data.text : '')
    const [title, setTitle] = useState(props.data ? props.data.title : '')
    const tags: Array<String> = [] 

    const result = text   ? (text.split(' ').map((t: any) => {
                        const regex = new RegExp(/\#\w+/g)
                        if (regex.test(t)) {
                            t = <span className={styles.tag}>{t} </span>
                            tags.push(t.props.children[0])
                        } else {t = <span>{t} </span>}
                        return t
                        }))
                        : '' 
    
    const addNewNote = () => {
        props.addNote(text, title)
        props.setAdd(false)
        setEditMode(false)
    }
    const onSubmit = () => {
        props.add 
        ? addNewNote()
        : updateNote()
    }

    const updateNote = () => {
        props.updateNote(props.data.id, text, title)
        setEditMode(false)
    }

    const onNoteChange = (e: React.ChangeEvent) => {
        const target = e.currentTarget as HTMLInputElement
        setNote(target.value)
    }

    const onNoteChangeTitle = (e: React.FocusEvent) => {
        const target = e.currentTarget as HTMLInputElement
        setTitle(target.value)
    }

    const cancel = () => {
        if(editMode) {
            setEditMode(false)
        } 
        setNote(props.data.text)
        setTitle(props.data.title)
        props.setAdd(false)

    }

    useEffect( () => {
        setTitle(props.data.title)
    }, [props.data.title])

    useEffect( () => {
        setNote(props.data.text)
    }, [props.data.text])

    useEffect( () => {
        setEditMode(props.add)
    }, [props.add])

    return(
        <>
            <div className={styles.card}>
                {!editMode
                ?
                <div>
                    <span><h3>{props.data.title}</h3></span>
                    <span className={styles.text}>{!props.data ? '' : result}</span>
                    <div className={styles.tag}>
                        {tags.map(el => {
                            return <span>{el}</span>
                        })}
                    </div>
                    <div className={styles.buttons}>
                        <button disabled={editMode} onClick={() => setEditMode(true)}>EDIT</button>
                        <button className={styles.delete} onClick={() => props.deleteNote(props.data.id)}>DELETE</button>
                    </div>
                </div>
                : <div>
                    <input onChange={() => onNoteChangeTitle} onBlur={onNoteChangeTitle} value={title}></input>
                    <input className={styles.text} onChange={onNoteChange} autoFocus={true} onBlur={onNoteChange} value={text}></input>
                    <div className={styles.tag}>
                        {tags.map(el => {
                            return (
                                <div>
                                    <span>{el}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.buttons}>
                        <button disabled={!editMode} onClick={onSubmit}>SAVE</button>
                        <button className={styles.delete} onClick={cancel}>CANCEL</button>
                    </div>
                </div>
                }
            </div>
        </>
    )
}