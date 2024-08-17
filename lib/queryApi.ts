import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      maxTokens: 500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res: any) => {
      console.log(res.data.choices[0].text);
      return res.data.choices[0].text;
    })
    .catch((err: any) => "Error: " + err);

  return res;
};

export default query;
