# TeleSwap

**TeleSwap** is a AI-Powered Telegram Mini App designed to facilitate seamless and secure swapping and staking of crypto assets on Starknet directly within the Telegram ecosystem. Built with **Next.js**, **Shadcn/ui**, **Langchain** and other technologies, it leverages modern web technologies for fast, responsive, and developer-friendly experiences.

## Features

- AI Agent chatbot to perform certain DeFi actions automatically.
- Secure and efficient asset swapping.
- Fast native staking.
- Integrated with Telegram's Mini App API.
- Integrated with Argent's Telegram Wallet SDK for seamless transaction and signing experience.
- Built with Next.js for performance and scalability.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- A Telegram bot with a Mini App set up (learn how to set this up [here](https://docs.telegram-mini-apps.com/platform/creating-new-app) and [here](https://docs.telegram-mini-apps.com/platform/test-environment))

### Clone the Repository

```bash
git clone https://github.com/Dev3-Studio/starknet-winter-frontend.git
cd starknet-winter-frontend
```

### Install Dependencies

Use your preferred package manager:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

---

## Development

### Running the App Locally

Start the development server:

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

### Setting Up the Environment

Create a `.env.development` file in the root of the project and add the required environment variables:

```env
NEXT_PUBLIC_MINI_APP_LINK=https://t.me/<your_bot_name>/<your_mini_app_name>
GOOGLE_API_KEY='Get key at https://aistudio.google.com/apikey'
```

Replace placeholders with your actual variables.

### Setting up ngrok

The Mini App must be run from a Telegram environment (in this case, the Test server) in order to function. We use ngrok to tunnel our local environment to the Telegram server.

```bash
ngrok http 3000
```

This command generates a public URL like `https://<your-subdomain>.ngrok.io`. Note the URL, as you'll need it for the next step.

### Configure Your Mini App in Telegram

1. Open Telegram and navigate to the [BotFather](https://t.me/BotFather).
2. Use the `/editapp` command and skip till it asks to set your Mini App's domain.
3. Enter the ngrok URL generated in the previous step. For example:
   ```
   https://<your-subdomain>.ngrok.io
   ```

---

## Building for Production

To build the app for production:

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

This creates an optimized build in the `.next` directory.

### Running the Production Build

After building, you can start the production server:

```bash
# Using npm
npm run start

# Or using yarn
yarn start
```

---

## Contributing

We welcome contributions! Here's how you can get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.txt) file for details.
