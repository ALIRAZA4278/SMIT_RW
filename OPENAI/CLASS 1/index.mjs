import express from "express"
import "dotenv/config"
import OpenAI from 'openai';
import inquirer from "inquirer";

const openai = new OpenAI()

const messages = [
    {
        role: "system",
        content: `
        You are helpful AI assitant
        `
    }
]
async function chat(user_query) {
    console.log(messages);
    messages.push({
        role: "user",
        content: user_query
    })

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        // response_format: { type: "json_object" },
        // n: 2,
        // frequency_penalty: -2.0,  \\ for unique word
        // temperature: 1,  // creativity in sentences
        // max_tokens: 2
    })
    // console.log(JSON.stringify(completion));
    // console.log(completion.choices);
    // console.log(typeof completion.choices[0].message.content);

    messages.push(completion.choices[0].message)
    const ai_res = completion.choices[0].message.content
    return ai_res
}

const askMan = () => {
    const ask = (query) => {
        inquirer
            .prompt([
                {
                    name: 'query',
                    message: query || "I am an AI assitant how can I help you? to exit prompt enter 0 \n"
                }
            ])
            .then(async (answers) => {
                // console.log(answers.query);
                const res = await chat(answers.query)
                const ans = res

                if (answers.query != 0) {
                    ask(`${ans} \n `)
                }
            })
    }
    ask()
}
askMan()