# 🌟 Seshat AI Setup Guide

## About Seshat
Seshat is the Egyptian goddess of wisdom, writing, and keeper of books - the perfect AI companion for your Enchanted Quill BMS! She can answer questions about your book inventory, make recommendations, and help users find what they're looking for.

## How to Enable Full AI Power

Currently, Seshat works with **basic intelligence** - she can search through your books and answer simple questions. To unlock her **full wisdom**, you'll need an OpenAI API key.

### Option 1: Use OpenAI API (Recommended)

1. **Get an API Key:**
   - Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Sign up or log in
   - Create a new API key
   - Copy the key (it starts with `sk-`)

2. **Add Your Key:**
   - Open `/components/SeshatChat.tsx`
   - Find line 47: `'Authorization': 'Bearer YOUR_API_KEY_HERE'`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

3. **Important Security Note:**
   - ⚠️ **NEVER** commit your API key to GitHub!
   - For production, use environment variables:
     ```typescript
     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
     ```
   - Add to `.env.local`:
     ```
     VITE_OPENAI_API_KEY=sk-your-key-here
     ```
   - Add `.env.local` to your `.gitignore`

### Option 2: Use Without API Key

Seshat works right now with **built-in intelligence**! She can:
- ✅ Search for books by title or author
- ✅ Check stock levels
- ✅ Find low stock items
- ✅ Show expensive or affordable books
- ✅ Provide basic information about your inventory

**No API key needed for basic features!**

## Example Questions to Ask Seshat

- "What books do you have by Carl Jung?"
- "Tell me about The Power of Now"
- "Which books are low in stock?"
- "What's the most expensive book?"
- "Do you have any Shakespeare?"
- "Show me affordable books under $15"
- "What books by Graham Hancock are available?"

## Customization

You can customize Seshat's personality by editing the `systemPrompt` in `/components/SeshatChat.tsx` (around line 40).

## API Costs

OpenAI API usage is pay-per-use:
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (very cheap!)
- **GPT-4**: More expensive but more intelligent

For a school project, GPT-3.5-turbo is perfect and costs are minimal (usually < $1 for hundreds of conversations).

---

✨ **Enjoy chatting with Seshat, the Mistress of the House of Books!** ✨
