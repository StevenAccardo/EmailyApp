import React from 'react';

const Landing = () => {
  return (
    <div className="text-center">
      <h1>Emaily!</h1>
      <p>Collect feedback from your clients!</p>
      <ul className="list-group">
        <li className="list-group-item">
          <p>Emaily allows you to send out e-mails to your clients, and then receive their feedback.</p>
        </li>
        <li className="list-group-item">
          <p>Emaily uses Sendgrid to send out formatted e-mails to your list of clients. The client receives the e-mail, responds, and those responses are tallied for you on your dashboard.</p>
        </li>
        <li className="list-group-item">
          <p>Payments for surveys are taken via Stripe, a 3rd party API.</p>
        </li>
        <li className="list-group-item">
          <p>
            * The Stripe API is set to "Test Mode". So, to test the application, click the add credits screen, and a modal will pop up that will give you fake credits to create surveys. Then, Enter
            the information below.
          </p>
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> Enter a fake e-mail.
        </li>
        <li className="list-group-item">
          <strong>Card Number:</strong> 4242 4242 4242 4242
        </li>
        <li className="list-group-item">
          <strong>MM / YY:</strong> 10/20
        </li>
        <li className="list-group-item">
          <strong>CVC:</strong> 123
        </li>
      </ul>
    </div>
  );
};

export default Landing;
