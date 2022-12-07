import { useState } from 'react'
import styles from './MainPage.module.scss'
import Note from './Note'

interface Props {
    text: string
}

export default function MainPage(props: any) {
    const [valueSearch, setValueSearch] = useState('')
    const [add, setAdd] = useState(false)

    const notes = props.data.notes.notes.filter((note: Props) => {
        return note.text.toLowerCase().includes(valueSearch.toLowerCase())
    }).map((note: Props)=> <Note data={note} 
                        deleteNote={props.data.deleteNote} 
                        updateNote={props.data.updateNote}
                        />)



    return(
        <>
            <div className={styles.main}>
                <div>
                    {add 
                        ?
                        <div> 
                            <h2>Add new notes</h2>
                            <div className={styles.notes_list}>
                                <Note addNote={props.data.addNote}
                                setAdd={setAdd}
                                add={add}
                                data={{}}
                                />
                            </div>
                        </div>
                        
                        :
                        <div className={styles.list}>
                            <div>
                                <form className={styles.form} >
                                    <input 
                                        type='text'
                                        placeholder='Search tag'
                                        onChange={(event) => setValueSearch(event.currentTarget.value)}
                                    />
                                </form>
                            </div>
                            <div>
                                <button className={styles.button} onClick={() => setAdd(true)}>ADD</button>
                            </div>
                            <div className={styles.notes_list}>
                                {notes}
                            </div>
                        </div>
                    }
                </div>

            </div>
                    
        </>
    )
}