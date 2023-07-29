const CharacterAI = require('node_characterai');
const express = require('express');
const bodyParser = require('body-parser');
const characterAI = new CharacterAI();

const app = express();
const port = 3000;

(async () => {
  await characterAI.authenticateWithToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTc3MzY3MTc3NDM2MzkwNjMxNTMiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5MDE5MjczOCwiZXhwIjoxNjkyNzg0NzM4LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.g_hi-ulHn7aa8BiW080pDice-lxRam-EiM9SMNmjJBK7ckTPhQno5lNYsn8qxxagCjWKKrZ5jtSRMMBOsDvr6-pRoh8sSJnZgc0K0ZRpk-D5ASlCL_yZWRptKAv89dChQ7UbWTB_mbfQDKpYVT36wCwqG-cNF2mx82pGkMhJIE_r9fGWfy1aXeKsgvigRe9H_PUfZIqz2ObwFRqQKwu3BMPhzwg83bYc1YAYZfDJ6oVs_5cU0ygerxgsd_1wPQqUUkOT04pHb8NLRHNP0ysRB1DtoJEyTnADpQjMGrOKrLR6jpw8qchxnpzIE9XoOpWPEVEh6wisKcRbh0VWw7TWqQ");

  app.use(bodyParser.json());

  // Enable CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.post('/chat', async (req, res) => {
    let characterId = "Hpk0GozjACb3mtHeAaAMb0r9pcJGbzF317I_Ux_ALOA"; // Replace this with your default characterId or any other default behavior you want
    const input = req.body.text;

    // If a characterId is provided in the URL, use it instead of the default characterId
    if (req.query.characterId) {
      characterId = req.query.characterId;
    }

    console.log('user-' + input);

    // Create or continue the chat with the given characterId
    const chat = await characterAI.createOrContinueChat(characterId);

    const response = await chat.sendAndAwaitResponse(input, true);
    console.log('bot-' + response.text);
    res.send({"text": response.text});
  });

  app.get('/active', async (req, res) => {
    res.status(200).send({ "active": "true" });
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
})();
