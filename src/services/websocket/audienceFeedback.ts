import { io, Socket } from 'socket.io-client';
import { FeedbackItem } from '../../types/audience';

export class AudienceFeedbackService {
  private socket: Socket | null = null;
  private readonly WEBSOCKET_URL = 'wss://api.engagesense.app';

  connect() {
    this.socket = io(this.WEBSOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to audience feedback service');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from audience feedback service');
    });
  }

  subscribeFeedback(callback: (feedback: FeedbackItem) => void) {
    if (!this.socket) return;
    
    this.socket.on('feedback', callback);
  }

  submitFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp'>) {
    if (!this.socket) return;
    
    this.socket.emit('submit_feedback', feedback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}