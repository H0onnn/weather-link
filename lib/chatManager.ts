import { socketManager } from './socketManager';

class ChatSocketManager {
  private static instance: ChatSocketManager;
  private isConnected: boolean = false;
  private activeRooms: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): ChatSocketManager {
    if (!ChatSocketManager.instance) {
      ChatSocketManager.instance = new ChatSocketManager();
    }
    return ChatSocketManager.instance;
  }

  public connectRoom(roomId: string) {
    this.activeRooms.add(roomId);
    if (!this.isConnected) {
      socketManager.connect();
      this.isConnected = true;
    }
  }

  public disconnectRoom(roomId: string) {
    this.activeRooms.delete(roomId);
    if (this.activeRooms.size === 0 && this.isConnected) {
      socketManager.disconnect();
      this.isConnected = false;
    }
  }

  public emit(eventName: string, data: any) {
    const socket = socketManager.getSocket();
    if (socket && this.isConnected) {
      console.log('emit', eventName, data);
      socket.emit(eventName, data);
    } else {
      console.warn('Socket is not connected. Unable to emit:', eventName);
    }
  }

  public on(eventName: string, callback: (data: any) => void) {
    const socket = socketManager.getSocket();
    if (socket) {
      socket.on(eventName, callback);
    }
  }

  public off(eventName: string, callback?: (data: any) => void) {
    const socket = socketManager.getSocket();
    if (socket) {
      if (callback) {
        socket.off(eventName, callback);
      } else {
        socket.off(eventName);
      }
    }
  }
}

export const chatSocketManager = ChatSocketManager.getInstance();
