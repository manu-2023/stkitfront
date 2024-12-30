import React from 'react'

export default function PaymentSub() {
 
  
    function onButtonClick() {
      window.open('https://manumstkitpayment.mojo.page/payment-for-subscription');
    }
    

  
  return (
    <div>
      <button onClick={onButtonClick}>CLlick Here to pay</button>
    </div>
  )
}
