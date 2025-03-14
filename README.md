# ![eisenhower-matrix.png](https://github.com/annaabramowicz/eisenhower-matrix/blob/master/public/android-icon-36x36.png) Eisenhower Matrix

The Eisenhower Matrix helps you prioritize tasks based on urgency and importance. Organize your to-dos efficiently and increase your productivity with this easy-to-use web application.

## 🤖 Configuration

For the application to work properly, you need to set up a MongoDB account and connect it to the app. Follow these steps:

1. **Create a MongoDB account**:  
   Visit [MongoDB](https://www.mongodb.com/) and create an account if you don't already have one.

2. **Create a new cluster**:  
   After logging in, navigate to the **Clusters** tab and create a new cluster.

3. **Generate Connection String**:  
   - In your MongoDB dashboard, go to the **Database** section.
   - Choose **Connect**, then select **Connect your application**.
   - Copy the connection string provided.

4. **Add connection string to `.env.local`**:  
   - In the root folder of your project, create a `.env.local` file (if it doesn't already exist).
   - Paste your MongoDB connection string like this:
     ```bash
     MONGODB_URL=YOUR_CONNECTION_STRING_HERE/matrixdb?retryWrites=true&w=majority
     ```
   - Replace `YOUR_CONNECTION_STRING_HERE` with the actual MongoDB connection string you copied.

## 🚀 Project setup   

1. Download this repository.
```bash
git clone https://github.com/annaabramowicz/eisenhower-matrix.git
```
2. Install dependencies
```bash
pnpm i
```
3. In root folder create new file called ".env.local" and paste it:
```bash
MONGODB_URL=YOUR_KEY
```
Instead "MONGODB_URL" paste your "API Key".

4. Start app
```bash
pnpm dev
```
👉 You can also view website on https://eisenhower-matrix-annaabramowiczs-projects.vercel.app/
