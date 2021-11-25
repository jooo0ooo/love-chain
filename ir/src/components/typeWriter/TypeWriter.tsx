import React, { useState, useEffect, useCallback } from "react";
import "./TypeWriter.css";

interface ITypeWriter {
    startDelay: number;
    typingDelay: number;
    erasingDelay: number;
    newTextDelay: number;
    textArray: Array<string>;
    loop: boolean;
}

interface IDelayText {
    text: string;
    delay: number;
}

function TypeWriter ({typingDelay,
    erasingDelay,
    newTextDelay,
    textArray,
    loop,
    startDelay}: ITypeWriter): JSX.Element {

    const [states, setStates] = useState<Array<IDelayText>>([]);
    const [stateIndex, setStateIndex] = useState(0);
    const [textContent, setTextContent] = useState("");
    const [typing, setTyping] = useState(false);
    const [active, setActive] = useState(false);

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    // compose all text states and their delays and store them in an array
    // i.e. "" => "h" => "ha" => "har" => etc, etc
    const init = useCallback(() => {
        setActive(true);
        // create empty array
        const allStates: Array<IDelayText> = [];
        // iterate over all words
        textArray.forEach(word => {
            // push "h", "ha", etc
            for (let i = 1; i <= word.length; i++) {
                allStates.push({
                    text: word.substr(0, i),
                    delay: typingDelay
                });
            }
            // push "hard", "har", "ha", etc.
            for (let i = word.length - 1; i >= 0; i--) {
                allStates.push({
                    text: word.substr(0, i),
                    delay: i === word.length - 1 ? newTextDelay : erasingDelay
                });
            }
            // push blank text
            allStates.push({ text: "", delay: typingDelay });
        });
        setStates(allStates);
    }, [erasingDelay, typingDelay, newTextDelay, textArray]);
    
    // call init, exactly once
    useEffect(() => {
        sleep(startDelay).then(() => {
            init();
        });
    }, [init]);

    // in the beginning, and if stateIndex has changes, set timeout
    // to schedule next text change
    useEffect(() => {
        // array not ready yet
        if (states.length === 0) return;
        const delay = states[stateIndex].delay;

        // calculate next states index
        const nextIndex = (stateIndex + 1) % states.length;

        // if final word is fully displayed, stop if loop is false
        const lastWordLength = textArray.slice(-1)[0].length;
        if (nextIndex === states.length - lastWordLength && !loop) return;

        // schedule next state
        const timeout = setTimeout(() => {
            const nextDelay = states[nextIndex].delay;
            setTyping(nextDelay === typingDelay || nextDelay === erasingDelay);
            // update displayed text
            setTextContent(states[stateIndex].text);
            // advance to next text state
            setStateIndex(nextIndex);
        }, delay);

        // cleanup
        return () => clearTimeout(timeout);
    }, [states, stateIndex, erasingDelay, typingDelay, loop, textArray]);

    // if we're typing, don't animate cursor
    const classes = ["cursor"];
    const test = [""];
    if (typing) {
        classes.push("typing");
        test.push("test");
    } else {
        classes.pop();
        test.push("end");
    }

    return (
        <div className={active ? "show" : "hide"}>
            <span className="typed-text">{textContent}</span>
            <span className={classes.join(" ")}>&nbsp;</span>
        </div>  
    );
}

export default TypeWriter;