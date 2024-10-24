



class EmailService{

    constructor(){}

    sendEmail(to, subject, from, content){
        console.log(`email sent to ${to}, with subject ${subject} and from ${from}. The Content is ${content}`);
    }
}

module.exports = new EmailService();