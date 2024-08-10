import React, { useEffect, useRef, useState } from 'react';
import Language from "./Languages.json";
import { saveAs } from 'file-saver';
import Editor from '@monaco-editor/react';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Terminal, { ColorMode, TerminalOutput, TerminalInput } from 'react-terminal-ui';
import './Compiler.css'

const Compiler = ({ socket, room }) => {
  const [code, setCode] = useState(Language['C# (Mono 6.6.0.161)'].value);
  const [CurrentLanguage, setCurrentLanguage] = useState("C# (Mono 6.6.0.161)");
  const [editortheme, seteditortheme] = useState("vs-dark");
  const [editorwidth, seteditorwidth] = useState("890px");
  const [open, setopen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  // Terminal Code
  var ld = []
  const [lineData, setLineData] = useState([
    <TerminalOutput key={0}>Welcome to SquadScript Terminal!!!</TerminalOutput>,
    <TerminalOutput key={1}></TerminalOutput>,
    <TerminalOutput key={2}>The commands available are:</TerminalOutput>,
    <TerminalOutput key={3}>'run code' will execute the current code</TerminalOutput>,
    <TerminalOutput key={4}>'run code, input=' starts multi-line input.<br></br>Type 'exec' to run the code.</TerminalOutput>,
    <TerminalOutput key={9}>'clear' will clear the terminal.</TerminalOutput>,
  ]);
  const [inputKey, setInputKey] = useState(0); // New state for inputKey
  const [isMultilineInput, setIsMultilineInput] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');


  const editorRef = useRef(null);
  const language_details = Language[CurrentLanguage];
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (socket) {
      socket.on('initialize', (initialCode) => {
        setCode(initialCode);
        if (editorRef.current) {
          isUpdatingRef.current = true;
          editorRef.current.setValue(initialCode);
          isUpdatingRef.current = false;
        }
      });

      socket.on('operation', (operation) => {
        setCode((prevCode) => {
          const newCode = applyOperation(prevCode, operation);
          if (editorRef.current) {
            isUpdatingRef.current = true;
            editorRef.current.setValue(newCode);
            isUpdatingRef.current = false;
          }
          return newCode;
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('initialize');
        socket.off('operation');
      }
    };
  }, [socket, room]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (e) => {
    const selectedLanguageName = e.target.value;
    if (Language.hasOwnProperty(selectedLanguageName)) {
      setCurrentLanguage(selectedLanguageName);
      setCode(Language[selectedLanguageName].value);
    }
  };

  const handleCodeChange = (value, event) => {
    if (!isUpdatingRef.current) {
      const operations = createOperations(event);
      setCode(value);
      operations.forEach(operation => sendOperation(operation));
    }
  };

  const handlethemechange = (e) => {
    seteditortheme(e.target.value);
  };

  const downloadcode = (e) => {
    e.preventDefault();
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    saveAs(blob, language_details.name);
    toast.info('File Downloading Started', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const uploadcode = (event) => {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        const extension = uploadedFile.name.split('.').pop();
        for (let key in Language) {
          if (Language[key].name.split('.').pop() === extension) {
            setCurrentLanguage(key);
            break;
          }
        }
      };
      reader.readAsText(uploadedFile);
      toast.success('File Uploaded Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      console.log('No file selected');
    }
  };

  const sendOperation = (operation) => {
    socket.emit('operation', { room, ...operation });
  };

  const applyOperation = (doc, operation) => {
    const { index, text, type } = operation;
    console.log(`Applying Operation: ${type} at index ${index} with text "${text}"`);

    if (type === 'insert') {
      doc = doc.slice(0, index) + text + doc.slice(index);
      console.log(`After Insert: ${doc}`);
    } else if (type === 'delete') {
      const endIndex = index + text.length;
      doc = doc.slice(0, index) + doc.slice(endIndex);
      console.log(`After Delete: ${doc}`);
    }

    return doc;
  };

  const createOperations = (event) => {
    const { changes } = event;
    const operations = [];
  
    changes.forEach(change => {
      const { range, text } = change;
      const { startColumn, startLineNumber, endColumn, endLineNumber } = range;
      const startIndex = editorRef.current.getModel().getOffsetAt({ lineNumber: startLineNumber, column: startColumn });
      const endIndex = editorRef.current.getModel().getOffsetAt({ lineNumber: endLineNumber, column: endColumn });
  
      // console.log(Change detected: ${`JSON.stringify(change)}`);
      // console.log(startIndex,endIndex)
      // console.log(code)
  
      if(startIndex!=endIndex){
        const deletedText = code.slice(startIndex, startIndex+change.rangeLength);
        operations.push({ index: startIndex, text: deletedText, type: 'replace' });
        // console.log(Replace operation: ${JSON.stringify({ index: startIndex, text: deletedText, type: 'replace' })});
      }
      else if (text === "") { // This means something was deleted
        const deletedText = code.slice(startIndex, endIndex+change.rangeLength);
        operations.push({ index: startIndex, text: deletedText, type: 'delete' });
        // console.log(Delete operation: ${JSON.stringify({ index: startIndex, text: deletedText, type: 'delete' })});
      }
  
      if (text) { // This means something was inserted
        operations.push({ index: startIndex, text, type: 'insert' });
        // console.log(Insert operation: ${JSON.stringify({ index: startIndex, text, type: 'insert' })});
      }
    });
  
    return operations;
  };

  async function onInput(input) {
    if (isMultilineInput) {
      if (input.trim() === 'exec') {
        const headers = {
          "authorization": localStorage.getItem("auth")
        }
        ld.push(<TerminalInput key={ld.length}>{currentCommand}</TerminalInput>);
        var stdin = currentCommand.replace('run code, input=\n', '')
        const response = await axios.post("/api/v1/rapidapi/judge",{
          language_id: Language[CurrentLanguage].id,
          source_code: code,
          stdin: stdin,
        });
        
        const { token } = response.data;
        const result = await axios.get(`/api/v1/rapidapi/judge/${token}`, { headers: headers });
        const { stdout, time, memory, stderr, compile_output } = result.data;
        if (!stderr && !compile_output){
          ld.push(<TerminalInput key={token}>Output:<br></br>{stdout}<br></br>Time: {time}ms,Space: {memory}kb</TerminalInput>)
        }
        else if(compile_output){
          ld.push(<TerminalInput key={token}>Compile Error:<br></br>{compile_output}</TerminalInput>)
        }
        else{
          ld.push(<TerminalInput key={token}>Error:<br></br>{stderr}</TerminalInput>)
        }
        setIsMultilineInput(false);
      } else {
        // Append the input to the current command
        setCurrentCommand(currentCommand + '\n' + input);
      }
    } else {
      const headers = {
        "authorization": localStorage.getItem("auth")
      }
      const command = input.trim().toLowerCase();
      if (command !== "run code, input=") {
        ld.push(<TerminalInput key={ld.length}>{input}</TerminalInput>);
      }
      if (command === 'run code') {
        const response = await axios.post("/api/v1/rapidapi/judge",{
          language_id: Language[CurrentLanguage].id,
          source_code: code,
          stdin: '',
        });
        
        const { token } = response.data;
        const result = await axios.get(`/api/v1/rapidapi/judge/${token}`, { headers: headers });
        const { stdout, time, memory, stderr, compile_output } = result.data;
        if (!stderr && !compile_output){
          ld.push(<TerminalInput key={token}>Output:<br></br>{stdout}<br></br>Time: {time}ms,Space: {memory}kb</TerminalInput>)
        }
        else if(compile_output){
          ld.push(<TerminalInput key={token}>Compile Error:<br></br>{compile_output}</TerminalInput>)
        }
        else{
          ld.push(<TerminalInput key={token}>Error:<br></br>{stderr}</TerminalInput>)
        }
      } else if (command.startsWith('run code, input=')) {
        setIsMultilineInput(true);
        setCurrentCommand(input);
      } else if (command === 'clear') {
        ld = [
          <TerminalOutput key={0}>Welcome to SquadScript Terminal!!!</TerminalOutput>,
          <TerminalOutput key={1}></TerminalOutput>,
          <TerminalOutput key={2}>The commands available are:</TerminalOutput>,
          <TerminalOutput key={3}>'run code' will execute the current code</TerminalOutput>,
          <TerminalOutput key={4}>'run code, input=' starts multi-line input. Type 'exec' to run the code with input.</TerminalOutput>,
          <TerminalOutput key={9}>'clear' will clear the terminal.</TerminalOutput>,
        ]
      } else if (command !== "") {
        ld.push(<TerminalOutput key={ld.length}>Unrecognized command</TerminalOutput>);
      }
    }
    setLineData(ld);
  }


  const redBtnClick = () => {
    ld = [];
    setLineData(ld); // Update the state
  }

  const yellowBtnClick = () => {
    setInputKey(prevKey => prevKey + 1); // Update the key to force re-render of Terminal
  }

  const greenBtnClick = () => {
    ld = [
      <TerminalOutput key={0}>Welcome to SquadScript Terminal!!!</TerminalOutput>,
      <TerminalOutput key={1}></TerminalOutput>,
      <TerminalOutput key={2}>The commands available are:</TerminalOutput>,
      <TerminalOutput key={3}>'run code' will execute the current code</TerminalOutput>,
      <TerminalOutput key={4}>'run code, input=' starts multi-line input. Type 'exec' to run the code.</TerminalOutput>,
      <TerminalOutput key={9}>'clear' will clear the terminal.</TerminalOutput>,
    ];
    setLineData(ld);
  }

  return (
    <>
      {open ?
        <div className='w-100'>
          <div className='d-flex'>
            <select onChange={handleLanguageChange} className='form-control w-25'>
              {Object.keys(Language).map((lang, index) => (
                <option key={index} value={lang}>{Language[lang].name}</option>
              ))}
            </select>
            <select className="form-control w-25 mx-2" value={editortheme} onChange={handlethemechange}>
              <option value="vs-dark">VS-Dark</option>
              <option value="vs-light">VS-Light</option>
              <option value="hc-black">High-contrast Dark</option>
              <option value="hc-light">High-contrast Light</option>
            </select>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setShowMenu(!showMenu)}
              >
                Options
              </button>
              {showMenu &&
                <div>
                  <button className="dropdown-item" onClick={downloadcode}>Download Code</button>
                  <input type="file" className="dropdown-item" onChange={uploadcode} />
                </div>
              }
            </div>
          </div>
          <Editor
            height="75vh"
            theme={editortheme}
            width={editorwidth}
            path={language_details.name}
            language={language_details.editor_name}
            value={code}
            onMount={handleEditorDidMount}
            onChange={handleCodeChange}
            options={{
              "acceptSuggestionOnCommitCharacter": true,
              "acceptSuggestionOnEnter": "on",
              "accessibilitySupport": "auto",
              "autoIndent": true,
              "automaticLayout": true,
              "codeLens": true,
              "colorDecorators": true,
              "contextmenu": true,
              "cursorBlinking": "blink",
              "cursorSmoothCaretAnimation": true,
              "cursorStyle": "line",
              "disableLayerHinting": true,
              "disableMonospaceOptimizations": true,
              "dragAndDrop": true,
              "fixedOverflowWidgets": true,
              "folding": true,
              "foldingStrategy": "auto",
              "fontLigatures": true,
              "formatOnPaste": true,
              "formatOnType": true,
              "hideCursorInOverviewRuler": true,
              "highlightActiveIndentGuide": true,
              "links": true,
              "mouseWheelZoom": true,
              "multiCursorMergeOverlapping": true,
              "multiCursorModifier": "alt",
              "overviewRulerBorder": true,
              "overviewRulerLanes": 2,
              "quickSuggestions": true,
              "quickSuggestionsDelay": 10,
              "readOnly": false,
              "renderControlCharacters": true,
              "renderFinalNewline": true,
              "renderIndentGuides": true,
              "renderLineHighlight": "all",
              "renderWhitespace": "none",
              "revealHorizontalRightPadding": 30,
              "roundedSelection": true,
              "rulers": [],
              "scrollBeyondLastColumn": 5,
              "scrollBeyondLastLine": true,
              "selectOnLineNumbers": true,
              "selectionClipboard": true,
              "selectionHighlight": true,
              "showFoldingControls": "mouseover",
              "smoothScrolling": true,
              "snippetSuggestions": "inline",
              "suggestOnTriggerCharacters": true,
              "wordBasedSuggestions": true,
              "wordSeparators": "`~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
              "wordWrap": "on",
              "wordWrapBreakAfterCharacters": "\t})]?|&,;",
              "wordWrapBreakBeforeCharacters": "{([+",
              "wordWrapColumn": 80,
              "wordWrapMinified": true,
              "wrappingIndent": "same"
            }}
          />
          <button onClick={() => setopen(!open)} className="btn btn-secondary">Show/Hide Terminal</button>
        </div>
        :
        <div className="my-compiler">
          <div  className='my-terminal'>
            <Terminal
              key={inputKey} // Add key prop here
              name='Terminal'
              colorMode={ColorMode.Dark}
              onInput={onInput}
              redBtnCallback={redBtnClick}
              yellowBtnCallback={yellowBtnClick}
              greenBtnCallback={greenBtnClick}
              height='67vh'
              >
              {lineData}
            </Terminal>
          </div>
          <button onClick={() => setopen(!open)} className="btn btn-secondary">Show/Hide Editor</button>
        </div>
      }
    </>
  );
};

export default Compiler;
