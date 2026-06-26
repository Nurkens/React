import { useState } from "react";
import { Chatbot } from "supersimpledev";

export function ChatInput({chatMessages,setChatMessages}){
  const[inputText,setInputText] = useState('');

  function saveInputText(event){
    setInputText(event.target.value);

  }
  async function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ]

    setChatMessages(newChatMessages);
    const response = await Chatbot.getResponse(inputText);
      setChatMessages([
        ...newChatMessages,
        {
          message:response,
          sender:'robot',
          id:crypto.randomUUID()
        }

      ])
    setInputText('');
  }
  function handleKeyDown(event){
    if(event.key === 'Enter'){
      sendMessage();
    }else if(event.key === 'Escape'){
      setInputText('')
    }
  }
  return(
      <div className="input-ctn">
          <input 
            placeholder="Send a message to Chatbot" 
            size="30"
            onChange={saveInputText}
            value={inputText}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <button 
            onClick={sendMessage}
            className="send-btn"
          >Send</button>  
      </div>
  );
}