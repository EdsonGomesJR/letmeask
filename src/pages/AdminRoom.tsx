import { useParams } from 'react-router';
import { Modal,   ModalContent,  useDisclosure, ModalOverlay,  Spinner, Center } from "@chakra-ui/react"

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import dangerImg from '../assets/images/danger.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import {RoomCode} from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';

import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';




type RoomParams = {
  id: string;
}
export function AdminRoom(){
  // const {user} = useAuth();
  const history = useHistory();
 const { isOpen, onClose, onOpen } = useDisclosure();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const {questions, title} = useRoom(roomId);


 useEffect(() => {

  // setInterval(() =>{}, 500);

  async function verifyClosedQuestions(){
    const roomRef = await database.ref(`rooms/${roomId}`).get();

    if(roomRef.val().endedAt) {
      setErrorModal(true);
      setIsLoading(false);
 

      // setInterval(()=>{
        
      //   history.push('/');
      // }, 1000);
     
      return;
    }

    setIsLoading(false);

  }
 verifyClosedQuestions();

  }, [roomId]);

 function openModal(){
    onOpen();
    setShowModal(true);
  
  }

  function closeModal(){
    history.push('/')
    onClose();
  }

  async function handleRemoveRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });
  
    history.push('/')
  }


  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
 
  return (
    <>
{isLoading ? (
  <Center h="100vh">
    <Spinner w="200px" h="200px" 
      thickness="8px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#835afd"/>
  </Center>

) : errorModal ? (
  <Modal
        size="2xl"
        isCentered
        onClose={onClose}
        isOpen
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
     >
    <ModalOverlay  />
    <ModalContent
    w="590px"
    h="362px"
    borderRadius="8px">
   
    <div className="modal-error">
    <img src={dangerImg} alt="deletar"/>
      <strong>Sala encerrada</strong>
        <p>A sala que você solicitou já foi encerrada, insira outro código de sala.</p>
      <div className="buttons-container">
        <Button onClick={closeModal} style={{backgroundColor: "#E73F5D",
      outline: 0}} >
          Ok, entendi
        </Button>
    
        </div>
    </div>
  
    </ModalContent>
  </Modal>
) :(
  <div id="page-room" >
  <header>
    <div className="content">
      <img src={logoImg} alt="LetmeAsk" />
    <div>
      <RoomCode code={roomId}/>
      <Button onClick={openModal} isOutlined>Encerrar Sala</Button>
     
    </div>
    </div>
  </header>

  <main>
    {showModal &&   
    <Modal
        size="2xl"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
     >
    <ModalOverlay  />
    <ModalContent
    w="590px"
    h="362px"
    borderRadius="8px">
   
    <div className="modal-error">
    <img src={dangerImg} alt="deletar"/>
      <strong>Encerrar sala</strong>
        <p>Tem certeza que você deseja encerrar esta sala? </p>
      <div className="buttons-container">
        <Button onClick={handleRemoveRoom} style={{backgroundColor: "#E73F5D",
      outline: 0}} >
          Sim, encerrar
        </Button>
        <Button onClick={onClose} style={{backgroundColor: "#DBDCDD",
      outline: 0, color:"#737380"}} >
        Cancelar
        </Button>
        </div>
    </div>
  
    </ModalContent>
  </Modal>
  
  }

    <div className="room-title">
      <h1>Sala {title}</h1>
      {questions.length > 0  && <span>{questions.length} pergunta(s)</span>}
    
    </div>
    <div className="question-list">
      {questions.map(question => {
        return(
          <Question 
            key={question.id} 
            content={question.content} 
            author={{
                name: question.author.name,
                avatar: question.author.avatar
             }}>
               
               <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
               >
                 <img src={deleteImg} alt="Remover Pergunta" />
               </button>
               
                </Question>
      );
          
      })}
    </div>
  
   </main>
  </div>
)}
      </>
    
  );
  
}