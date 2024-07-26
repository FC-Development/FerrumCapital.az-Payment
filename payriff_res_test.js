// Your JSON response as a JavaScript object
const response = {
    payload: {
      orderId: "28665540-0fb3-4790-8e46-6de21646e601",
      amount: 120,
      currencyType: "AZN",
      merchantName: "Ferrum Capital",
      operationType: "PURCHASE",
      paymentStatus: "DECLINED",
      auto: false,
      createdDate: "2024-07-24T12:36:13.316",
      description: "MAX000067",
      transactions: [
        {
          uuid: "47e873e5-110b-4e7a-80a7-a1b43fad6946",
          createdDate: "2024-07-24T12:36:44.618",
          status: "DECLINED",
          channel: "KAPITAL_BANK",
          channelType: "ON_US",
          requestRrn: "1080533",
          responseRrn: "121903265",
          pan: "416973******6150",
          paymentWay: "DIRECT",
          cardDetails: {
            maskedPan: "416973******6150",
            brand: "VISA",
            cardHolderName: "Asad Abdullayev"
          },
          merchantCategory: "ES1090030",
          installment: {}
        },
        {
          uuid: "47e873e5-110b-4e7a-80a7-a1b43fad6946",
          createdDate: "2024-07-24T12:36:44.618",
          status: "APPROVED",
          channel: "KAPITAL_BANK",
          channelType: "ON_US",
          requestRrn: "1080533",
          responseRrn: "121903265",
          pan: "416973******6150",
          paymentWay: "DIRECT",
          cardDetails: {
            maskedPan: "416973******6150",
            brand: "VISA",
            cardHolderName: "Asad Abdullayev"
          },
          merchantCategory: "ES1090030",
          installment: {}
        }
      ]
    },
    code: "00000",
    message: "Operation performed successfully",
    route: "dashboard/main",
    responseId: "f3b8f05feaef4cc5b52525e67fcfd7c9"
  };
  
  // ANSI escape codes for coloring the console output
  const red = '\x1b[31m';
  const reset = '\x1b[0m';
  
  // Function to display declined transactions in the console
  function displayDeclinedTransactions(response) {
    const transactions = response.payload.transactions;
  
    transactions.forEach(transaction => {
      if (transaction.status === "DECLINED") {
        console.log(
          `${red}Transaction ID: ${transaction.uuid}\nStatus: ${transaction.status}\nChannel: ${transaction.channel}\nDate: ${transaction.createdDate}${reset}`
        );
      }
    });
  }
  
  // Call the function to display declined transactions
  displayDeclinedTransactions(response);