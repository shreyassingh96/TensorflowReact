import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState([]);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    setLoading(false);
    console.log('Model loaded')
  }

  useEffect(()=>{loadModel()}, [])

  const answerQuestion = async (e) =>{
    console.log("AQ called");
    if (
      // e.which === 13 && 
      model !== null ){
    console.log('Question submitted.')
    const passage = passageRef.current.value
    const question = questionRef.current.value
    const answers = await model.findAnswers(question,
    passage)
    setAnswer(answers);
    setLoading(false);
    console.log(answers)
    }
    }
    
    


  // return (
  //   <div className="App">
  //   {model == null ?
  // <div>
  //   <div>Model Loading</div>
  // </div> :
  // <Fragment>
  //   passage
  //   <textarea ref={passageRef} rows="30" cols="100"></textarea>
  //   Ask a question
  //   <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
  //   answers
  //   {answer ? (answer.map((ans,idx)=><div><b>Answer{idx+1} = </b>{ans.text} {ans.score}</div>)):""}
  // </Fragment>

  // }
  //   </div>
  // );
  return (
    <div className="App d-flex flex-column justify-content-center min-vh-100" style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container-fluid" style={{ backgroundColor: "#6c757d", color: "#fff", padding: "10px 20px" }}>
        <h1>TensorFlow Q&amp;A App</h1>
      </div>
      <div className="flex-grow-1 d-flex flex-column justify-content-center" style={{ padding: "20px" }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Fragment>
            <Form>
              <Form.Group controlId="formPassage" className="mb-3">
                <Form.Label>Passage</Form.Label>
                <Form.Control as="textarea" rows={6} ref={passageRef} />
              </Form.Group>
              <Form.Group controlId="formQuestion" className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" ref={questionRef} onKeyPress={answerQuestion} />
              </Form.Group>
              <Button variant="primary" onClick={answerQuestion}>
                Answer
              </Button>
            </Form>
            {answer.length > 0 && (
              <Fragment>
                <h2>Answers</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Answer</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answer.map((ans,idx)=>
                      <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{ans.text}</td>
                        <td>{ans.score}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      <footer className="mt-auto" style={{ backgroundColor: "#6c757d", color: "#fff", padding: "10px 20px" }}>
        <p>&copy; 2023 TensorFlow Q&amp;A App</p>
        <p>By: Shreyas Singh, Angelo Goncalves & Mayuran Srichandrabose</p>
      </footer>
    </div>
  );
}

export default App;
