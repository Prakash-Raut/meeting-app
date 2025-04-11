import Peer from "peerjs";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

interface Store {
  socket: Socket | null;
  user: Peer | null;
  stream: MediaStream | null;
  peers: Record<string, MediaStream>;
  initialize: () => void;
  setStream: (stream: MediaStream) => void;
  addPeer: (peerId: string, stream: MediaStream) => void;
}

export const useRoomStore = create<Store>((set, get) => ({
  socket: null,
  user: null,
  stream: null,
  peers: {},

  initialize: async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // Set the stream in the store
      set({ stream });
      
      // Create Socket.IO and PeerJS connections
      const socket = io("http://localhost:5501", { transports: ["websocket"] });
      const peer = new Peer(uuidv4());
  
      // Save socket and peer in the store
      set({ socket, user: peer });
  
      // Handle incoming calls
      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          set((state) => ({
            peers: { ...state.peers, [call.peer]: remoteStream },
          }));
        });
      });
  
      // When a new user joins, call them
      socket.on("user-joined", ({ peerId }) => {
        const call = peer.call(peerId, stream);
        call.on("stream", (remoteStream) => {
          set((state) => ({
            peers: { ...state.peers, [peerId]: remoteStream },
          }));
        });
      });
    } catch (error) {
      console.error("Failed to get media stream:", error);
    }
  },

  setStream: (stream) => set({ stream }),

  addPeer: (peerId, stream) =>
    set((state) => ({
      peers: { ...state.peers, [peerId]: stream },
    })),
}));
