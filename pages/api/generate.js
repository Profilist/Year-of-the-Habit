import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      }
    });
    return;
  }

  const goal = req.body.goal || '';
  if (goal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid resolution",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePlan(req.body.goal),
      max_tokens: 2000,
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePlan(resolution) {
  const goal = resolution[0].toUpperCase() + resolution.slice(1).toLowerCase();
  return `Suggest a 3 step plan to fulfill my new year's resolution.
#
Resolution: Quit smoking
Plan: 
1. Prepare to quit: Before you quit, it's important to have a plan in place. This might include setting a quit date, informing your friends and family about your decision, and identifying triggers that lead you to smoke. You may also want to consider seeking support from a healthcare professional or a smoking cessation program.
2. Quit smoking: On your quit date, it's important to remove all cigarettes and smoking paraphernalia from your environment. You may also want to consider using nicotine replacement therapy (such as nicotine gum or patches) to help manage withdrawal symptoms.
3. Stay smoke-free: After you quit smoking, it's important to stay smoke-free to maintain the benefits to your health. This may involve finding new ways to cope with stress or triggers that lead you to smoke, and seeking support from friends, family, or a support group. It may also be helpful to set small goals to celebrate your progress and reward yourself for staying smoke-free.
#
Resolution: ${goal}
Plan:`;
}
