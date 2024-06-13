import OpenAI from "openai";
import "dotenv/config"
import { v4 as uuidv4 } from "uuid"
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});
const index = pc.index("syalni")




const createEmbeddings = async (query) => {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
    });

    console.log(embedding.data);
    return embedding
}
// createEmbeddings(data)


const smartRetrival = async (query) => {
    const openaiEmbeddingRes = await createEmbeddings(query)
    const embedding = openaiEmbeddingRes.data[0].embedding
    const queryResponse = await index.namespace("faq").query({
        topK: 3,
        vector: embedding,
        includeMetadata: true,
        includeValues: false
    });
    console.log(JSON.stringify(queryResponse, null, 2));
    const chunks = queryResponse.matches.map((data, i) => {
        return `chunks ${i + 1} : ${data.metadata.text}`
    })

    const formattedData = chunks.join("\n")
    console.log(formattedData)
    return formattedData

}
// smartRetrival(query)


const chat = async (user_query) => {
    const releventData = await smartRetrival(user_query)
    const messages = {
        role: 'user',
        content: `You are a help AI assitant. Give answer according to provided data if answer cannot given from data just say 'I don't know' 
        Provided Data:
        ${releventData}
        `
    }
    console.log(messages);
    messages.push({
        role: "user",
        content: user_query
    })

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
    })



    // messages.push(completion.choices[0].message)
    const ai_res = completion.choices[0].message.content
    console.log(ai_res);
    return ai_res
}
chat("Who is the founder of saylani?")


// const askMan = () => {
//     const ask = (query) => {
//         inquirer
//             .prompt([
//                 {
//                     name: 'query',
//                     message: query || "I am an AI assitant how can I help you? to exit prompt enter 0 \n"
//                 }
//             ])
//             .then(async (answers) => {
//                 // console.log(answers.query);
//                 const res = await chat(answers.query)
//                 const ans = res

//                 if (answers.query != 0) {
//                     ask(`${ans} \n `)
//                 }
//             })
//     }
//     ask()
// }
// askMan()