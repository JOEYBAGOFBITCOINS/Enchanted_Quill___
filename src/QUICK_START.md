# 🌟 Quick Start - Add Your OpenAI API Key

## Step 1: Add Your API Key

Open the `.env.local` file and add your OpenAI API key:

```
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Replace `sk-your-actual-api-key-here` with your real OpenAI API key.**

## Step 2: Restart Your Development Server

If your app is already running, restart it so it picks up the environment variable:

1. Stop the server (Ctrl+C or Cmd+C)
2. Start it again with `npm run dev` or `npm start`

## Step 3: Test Seshat!

Click the golden floating button in the bottom-right corner and try asking:

- "What books do you have about psychology?"
- "Tell me about The Emerald Tablets"
- "Which books are running low in stock?"
- "Recommend something about ancient wisdom"
- "What's the most expensive book you have?"

## 🔒 Security Notes

✅ **DO:**
- Keep your `.env.local` file private
- Add `.env.local` to `.gitignore` (already done!)
- Use environment variables for API keys

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Share your API key publicly
- Hardcode the API key in your source code

## 💰 API Costs

- GPT-3.5-turbo costs about **$0.002 per 1,000 tokens**
- A typical conversation costs less than $0.01
- Perfect for school projects! Very affordable

## 🎓 For Your School Project

When you submit or demo your project:
- **Don't include your API key** in the submission
- Include the `.env.example` file
- Add instructions for the teacher to add their own key if they want to test the AI features
- The app works great even without the API key! Seshat has built-in intelligence

---

✨ **You're all set! Enjoy chatting with Seshat!** ✨
