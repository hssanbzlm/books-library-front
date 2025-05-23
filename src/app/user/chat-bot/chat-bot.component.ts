import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css',
  animations: [
    trigger('chatAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '250ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ChatBotComponent {
  isChatOpen = false;
  messages = [
    { sender: 'bot', text: 'Hi there! Need help finding a book?' },
    { sender: 'user', text: 'Yes, can you recommend me something?' },
    { sender: 'bot', text: 'Sure! What genre are you into?' },
  ];

  newMessage = '';

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({ sender: 'user', text: this.newMessage });
    const userMsg = this.newMessage;
    this.newMessage = '';

    // Simulate bot response
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: `You said: "${userMsg}". I'll look into that!`,
      });
    }, 1000);
  }
}
