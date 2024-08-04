import React, { useEffect, useRef, useState } from 'react';
import Language from "./Languages.json";
import { saveAs } from 'file-saver';
import Editor from '@monaco-editor/react';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Terminal, { ColorMode, TerminalOutput, TerminalInput } from 'react-terminal-ui';

const Compiler = ({ socket, room }) => {
  const [code, setCode] = useState('');
  const [CurrentLanguage, setCurrentLanguage] = useState("C# (Mono 6.6.0.161)");
  const [editortheme, seteditortheme] = useState("vs-dark");
  const [editorwidth, seteditorwidth] = useState("890px");
  const [open, setopen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  // Terminal States
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

  useEffect(() => {
    if (socket) {
      socket.on('code', (data) => {
        setCode(data);
        console.log('Received code update');
      });
    }

    return () => {
      if (socket) {
        socket.off('code');
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

  const handleCodeChange = (value) => {
    setCode(value);
    sendCode(value); // Pass the updated code to sendCode
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

  const sendCode = (code) => {
    socket.emit('code', { room, code }); // Ensure the format is { room, code }
    console.log(`Sent code to room: ${room}`);

  };

  // Terminal Code
  let ld = [...lineData];

  function onInput(input) {
    if (isMultilineInput) {
      if (input.trim() === 'exec') {
        // exec the current command
        ld.push(<TerminalInput key={ld.length}>{currentCommand}</TerminalInput>);
        // Add your command execution logic here
        setIsMultilineInput(false);
      } else {
        // Append the input to the current command
        setCurrentCommand(currentCommand + '\n' + input);
      }
    } else {
      const command = input.trim().toLowerCase();
      if (command!=="run code, input=") {
        ld.push(<TerminalInput key={ld.length}>{input}</TerminalInput>);
      }
      if (command === 'run code') {
        // exec the current code
        // This will depend on what you mean by "current code"
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
      } else if (command!==""){
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
        <div>
          <div className='d-flex'>
            <select onChange={handleCodeChange} className='form-control w-25'>
              {Object.keys(Language).map((lang) => {
                return <option key={lang} value={lang}>{lang}</option>
              })}
            </select>
            <div>
              <button className="btn btn-success" onClick={() => setShowMenu(!showMenu)}>
                Actions
              </button>
              {showMenu && (
                <div className="d-flex" style={{ flexDirection: 'column' }}>
                  <button className="btn btn-success" onClick={downloadcode}>Download Code</button>
                  <button className="btn btn-success" onClick={() => document.querySelector('#fileInput').click()}>Upload Code</button>
                </div>
              )}
              <input type='file' id='fileInput' onChange={uploadcode} style={{ display: 'none' }} />
            </div>
            {open ?
              <button className='btn btn-primary' onClick={() => setopen(!open)}>Terminal</button> :
              <button className='btn btn-primary' onClick={() => setopen(!open)}>Compiler</button>
            }
            <select className={`form-select bg-dark text-light w-25`} onChange={handlethemechange}>
              <option value="vs-dark">VS-Dark Theme</option>
              <option value="vs-light">VS-Light Theme</option>
            </select>
          </div>
          <Editor
            height="50vh"
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
              "suggestOnTriggerCharacters": true,
              "wordBasedSuggestions": true,
              "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
              "wordWrap": "off",
              "wordWrapBreakAfterCharacters": "\t})]?|&,;",
              "wordWrapBreakBeforeCharacters": "{([+",
              "wordWrapBreakObtrusiveCharacters": ".",
              "wordWrapColumn": 80,
              "wordWrapMinified": true,
              "wrappingIndent": "none"
            }}
          />
        </div> :
        <div className="container w-50 h-50">
          {open ?
              <button className='btn btn-primary' onClick={() => setopen(!open)}>Terminal</button> :
              <button className='btn btn-primary' onClick={() => setopen(!open)}>Compiler</button>
            }
          <Terminal
            key={inputKey} // Add key prop here
            name='Terminal'
            colorMode={ColorMode.Dark}
            onInput={onInput}
            redBtnCallback={redBtnClick}
            yellowBtnCallback={yellowBtnClick}
            greenBtnCallback={greenBtnClick}>
            {lineData}
          </Terminal>
        </div>
      }
    </>

  );
};

export default Compiler;
