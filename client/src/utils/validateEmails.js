//A FUNCTION SPECIFICALLY USED FOR SEPERATING OUT A STRING OF COMMA SEPERATED EMAILS, TRIM THE WHITESPACE, AND THEN RETURN AN ARRAY WITH A SEPERATE EMAIL AT EACH INDEX.

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  //.split() method, splits the string at each comma, and places each email into an index on an array that is returned and stored in emailArrays. Then the .map() method maps over the array, and at each index, it performs the .trim() method which removes the white space from either side. The .map() method then returns entirely new array.Then the .filter() method is called and passed the array returned from the .map() method. The .filter() method then itterates over each index, and passess it into a function that uses a email regex, that I grabbed form emailregex.com, and the .test() method to validate the email. The .test() method will return true if the email is valid, and false if it is not. However, the .filter() method places the emails that return true in an array, but we want it to hold onto the invalid emails, which would be returned as false, so we add the === false line, to tell the function to only return the emails that our returned false from the .test() method.
  //Now we will have an array of only invalid emails left over.
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false);

  //checks to see if the length of the array is true, or greater than zero, if so it returns a string with the list of invalid emails.
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  //If there are no invalid emails, then just return.
  return;
};
