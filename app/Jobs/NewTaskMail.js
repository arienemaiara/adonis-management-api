"use strict";

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  static get concurrency() {
    return 4;
  }

  static get key() {
    return "NewTaskMail-job";
  }

  async handle({ username, email, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`)
    
    await Mail.send(
      ["emails.new_task"],
      { username, title, hasAttachment: !!file },
      (message) => {
        message
          .to(email)
          .from("arienemaiara@gmail.com", "Adonis API")
          .subject("A new task was assigned for you");

        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name,
          });
        }
      }
    );
  }
}

module.exports = NewTaskMail;
