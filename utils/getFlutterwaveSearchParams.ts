type FluttterwavePaymentParams = {
   status: string;
   transactionId: string;
   txRef: string;
}

export function getFluttterwaveSearchParams (window: Window): FluttterwavePaymentParams {
   const urlParams = new URLSearchParams(window.location.search);
   const status = urlParams.get('status');
   const transactionId = urlParams.get('transaction_id');
   const txRef = urlParams.get('tx_ref');
   return {
      status: status || "",
      transactionId: transactionId || "",
      txRef: txRef || ""
   }
}