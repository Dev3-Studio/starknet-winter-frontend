export enum Actions {
  Buy,
  Sell,
  // Swap,
}

export const promptExamples = [
  {
    "input": "I want to buy 10 BTC",
    "toolCallName": "preprocessor",
    "toolCallOutput": {
      "action": Actions.Buy,
      "token": "BTC",
      "amount": 10
    }
  },
  {
    "input": "I want to sell 10 BTC",
    "toolCallName": "preprocessor",
    "toolCallOutput": {
        "action": Actions.Sell,
        "token": "BTC",
        "amount": 10
    }
  },
  {
    "input": "I want to buy 10 ETH",
    "toolCallName": "preprocessor",
    "toolCallOutput": {
        "action": Actions.Buy,
        "token": "ETH",
        "amount": 10
    }
  },
  {
    "input": "I want to sell 10 ETH",
    "toolCallName": "preprocessor",
    "toolCallOutput": {
      "action": Actions.Sell,
      "token": "ETH",
      "amount": 10
    }
  }
]