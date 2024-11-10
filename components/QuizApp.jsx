"use client"
import React, { useState } from 'react'
import { data } from '@/app/dashboard/(Quiz)/question/data'

const QuizApp = () => {

    const [index , setIndex] = useState(0) ; 
    const [questions , setQuestions] = useState(data[index]) ; 
    const [end , setEnd] = useState(false) ; 
    const [correctOption , setCorrectOption] = useState(null) ; 
    const [optionSlected, setOptionSlected] = useState(null) ; 
    const [lock , setLock] = useState(false) ; 
    const [score , setScore] = useState(0)

    const Options = [questions.option1 , questions.option2 , questions.option3 , questions.option4]

    const checkAnswer = (id) => {
       if(!lock){
            setOptionSlected(id) ; 
            if(questions.ans === id){
                setCorrectOption(id) ;  
                setScore( prev => prev+1 )       
            }       
       }
       setLock(true)
    }

    const handleNext  = () => {
  
           if(lock){
            if(index === data.length-1){
                setEnd(true)
                            return ; 
                    }
                    console.log("Salam Kawou") ; 
                    setIndex(index+1)
                    setQuestions(data[index+1])
                    setLock(false)
                    setCorrectOption(null)
                    setOptionSlected(null) ; 
           }
    }

    const Reset = () => {
       setIndex(0)
       setQuestions(data[index])
       setLock(false) ; 
       setCorrectOption(null)
       setOptionSlected(null)
       setScore(0)
       setEnd(false)
       
    }


  return (
        <section className='flex justify-center mt-20'>

            <div className='w-[350px] h-[380px] rounded-md shadow-md border-2 p-3 gap-2 flex flex-col'>
                <h1 className='text-xl font-[montserrat]  '>Quiz app</h1>  
                <hr className='h-[3px] bg-black ' />

                {end ?  
                <div className='flex flex-col  items-center justify-center mt-4 text-xl'>
                     <>Votre score : {score} / {data.length} </>
                     <button className='flex mt-2 justify-between bg-teal-500 px-2 p-1'
                      onClick={Reset}>Reset</button>
                </div>
                  
                 : 
                <>
                <h1>{index+1}. {questions.question}  </h1>
                <ul className={` flex flex-col gap-2     `}>
                   {Options.map( (option , indice) => (
                    <li 
                    onClick={() => checkAnswer(indice+1)}
                    className={` border-2 p-1 pl-2 cursor-pointer  
                        ${correctOption === indice+1 ? 'bg-green-400 border-emerald-500' : 
                         optionSlected=== indice+1 && correctOption !==indice+1  ? 'bg-red-600 border-red-500 ' : '' } 
                        `}
                    key={indice}>
                        {option}
                    </li>
                   )  )}
                  
                </ul>

                <div >
                    <button onClick={handleNext}
                     className='flex  my-2 mx-auto bg-violet-500  text-white  px-4 p-1  '>Next</button>
                    <p className='text-center'>Score : {score}/5</p>
                </div>
                </>}

                    


            </div>
            
        </section>
  )
}

export default QuizApp
