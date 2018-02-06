//PACKEGES UP A NEWLY CREATED SURVEY AND SEND IT OF TO SENDGRID
//Used in the surveyRoutes file
//imports sendgrid library
const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
//imports api key file
const keys = require('../config/keys');

//helper.Mail is a property that takes a bunch of configuration and spits out a mailer
class Mailer extends helper.Mail {
  //whenver you pass in args to a class, they get passed into the constructor method
  //not importing as survey so we can keep the functionality general for any e-mails we want to send, so instead importiong destrcutured properties: subject and recipients
  constructor({ subject, recipients }, content) {
    //makes sure an constructors in the helper class that we extended get ran first.
    super();

    //Method used to send out the Mailer to sendgrid.
    //pass the sendgrid key into the sendgrid library, and that returns an object that we can send off
    this.sgApi = sendGrid(keys.sendGridKey);

    //Who the e-mail is coming from
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    //Creates the bosy of the e-mail. first arg is what type of body content we are passing in, 2nd arg is the html string we want rendered in the e-mail.
    this.body = new helper.Content('text/html', content);
    //Created a helper function to format the list of objects that contain each recipient e-mail
    //The function returns an array with each index contianing an e-mail wrapped in the helper.Email function from sendgrid
    this.recipients = this.formatAddresses(recipients);

    //always have to use this method from the helper.Mail class to actually add the this.body as Content
    //available from helper.Email class
    this.addContent(this.body);

    //custom method that enables click tracking in the outgoing emails for our mailer
    this.addClickTracking();

    //custom method that processes the e-mail recipients array properly, so it can be packaged correctly for the outgoing mailer.
    this.addRecipients();
  }

  formatAddresses(recipients) {
    //maps over each object, and grabs the email value
    return recipients.map(({ email }) => {
      //Makes an array with a new helper.Email(email) at each index.
      return new helper.Email(email);
    });
  }

  //custom method for adding clicktracking capability to e-mails so we can track when recipients click yes or no.
  addClickTracking() {
    //all sendgrid classes and methods

    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    //new instance of a class from helper
    const personalize = new helper.Personalization();

    //takes the list of recipients where each index has helper.Email(email) in it, and adds it to the personalize instance
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    //takes the personalize instance and passes it to a method on the helper.Mail class
    this.addPersonalization(personalize);
  }

  //custom method to send off the Mailer
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      //toJSON() is defined by the helper.Mail base class
      body: this.toJSON()
    });

    //API() method is provided by the sendgrid library
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
