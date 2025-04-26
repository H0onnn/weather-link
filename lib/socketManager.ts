import { type Socket, io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:3000/chat';

class SocketManager {
  private static instance: SocketManager | null = null;
  private socket: Socket | null = null;
  private token: string | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public setToken(token: string) {
    this.token = token;
  }

  public connect() {
    if (!this.socket) {
      console.log('소켓 연결 시도:', SOCKET_URL);

      this.socket = io(SOCKET_URL, {
        extraHeaders: {
          token: this.token || '',
        },
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
        autoConnect: true,
        withCredentials: true,
      });

      this.socket.on('connect', () => {
        console.warn('소켓 연결 성공');
      });

      this.socket.on('disconnect', (reason) => {
        console.warn('소켓 연결 해제됨', reason);
      });

      this.socket.on('error', (error) => {
        console.error('소켓 오류:', error);
      });

      this.socket.on('connect_error', (error) => {
        console.error('소켓 연결 오류:', error);
        console.log('현재 소켓 상태:', this.socket?.connected ? '연결됨' : '연결 안됨');
      });
    }

    return this.socket;
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketManager = SocketManager.getInstance();
