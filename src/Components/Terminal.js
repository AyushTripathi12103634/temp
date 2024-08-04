import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput, TerminalInput } from 'react-terminal-ui';

const TerminalController = () => {
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
    <div className="container">
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
  )
};

export default TerminalController;