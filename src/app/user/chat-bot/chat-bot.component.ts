import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { BookService } from '@src/services/book.service';

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
  constructor(private bookService: BookService) {}
  isChatOpen = false;
  messages = [{ sender: 'assistant', text: 'Hi there! Need help finding a book?' }];

  newMessage = '';

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({ sender: 'user', text: this.newMessage });
    this.bookService.recommendBooks(this.newMessage).subscribe({
      next: (response) => {
        const contentResult = response.content.replace(/\((http[^)]+)\)/g, `<a class="book-link" href="$1" target="_blank">Read more</a>`) 
        console.log('content result ',contentResult)
        this.messages.push({ sender: response.role, text: contentResult });
      },
      error: () => {
        this.messages.push({sender:'assistant',text:'Sorry I do not have an answer now, come back later'})
      },
    });
    this.newMessage = '';
  }
}
