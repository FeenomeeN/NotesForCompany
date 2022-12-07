
import MainPage from './Components/MainPage';
import { connect } from 'react-redux'
import { addNote, updateNote, deleteNote } from './reducer'

function App(props :any) {
  return (
    <MainPage data={props} />
  );
}

const stateToProps = (state: any) => {
  return state;
}

export default connect(stateToProps, {addNote, updateNote, deleteNote})(App);
