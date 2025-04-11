"use client";

import { useRoomStore } from "@/lib/store";
import { Button } from "@workspace/ui/components/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import {
	Hand,
	MessageSquareText,
	Mic,
	MicOff,
	PhoneOff,
	Settings,
	Video,
	VideoOff,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export function ControlBox({ stream }: { stream: MediaStream }) {
	const { id } = useParams();
	const { socket, user } = useRoomStore();

	const [isMicrophoneOn, setMicrophoneOn] = useState(true);
	const [isCameraOn, setCameraOn] = useState(true);
	const [isCaptionsOn, setCaptionsOn] = useState(false);
	const [isHandRaised, setHandRaised] = useState(false);

	const toggleMicrophone = () => {
		if (stream) {
			const audioTracks = stream.getAudioTracks();
			for (const track of audioTracks) {
				track.enabled = !track.enabled;
			}
			setMicrophoneOn(!isMicrophoneOn);
		}
	};

	const toggleCamera = () => {
		if (stream) {
			const videoTracks = stream.getVideoTracks();
			for (const track of videoTracks) {
				track.enabled = !track.enabled;
			}
			setCameraOn(!isCameraOn);
		}
	};

	const toggleCaptions = () => {
		setCaptionsOn(!isCaptionsOn);
	};

	const toggleHand = () => {
		setHandRaised(!isHandRaised);
	};

	const leaveMeeting = () => {
		if (socket) {
			socket.emit("leave-room", { roomId: id, peerId: user?.id });
		}
		window.location.href = "/";
	};

	return (
		<div className="p-4 bg-white dark:bg-gray-800 border-t flex items-center justify-center rounded-full shadow-md">
			<div className="flex items-center gap-2 md:gap-4">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={isMicrophoneOn ? "outline" : "secondary"}
								size="icon"
								onClick={toggleMicrophone}
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							>
								{isMicrophoneOn ? (
									<Mic className="h-5 w-5" />
								) : (
									<MicOff className="h-5 w-5" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{isMicrophoneOn ? "Turn off microphone" : "Turn on microphone"}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={isCameraOn ? "outline" : "secondary"}
								size="icon"
								onClick={toggleCamera}
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							>
								{isCameraOn ? (
									<Video className="h-5 w-5" />
								) : (
									<VideoOff className="h-5 w-5" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{isCameraOn ? "Turn off camera" : "Turn on camera"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={isCaptionsOn ? "secondary" : "outline"}
								size="icon"
								onClick={toggleCaptions}
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							>
								<MessageSquareText className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{isCaptionsOn ? "Turn off captions" : "Turn on captions"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={isHandRaised ? "secondary" : "outline"}
								size="icon"
								onClick={toggleHand}
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							>
								<Hand className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{isHandRaised ? "Lower hand" : "Raise hand"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							>
								<Settings className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Settings</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="destructive"
								size="icon"
								onClick={leaveMeeting}
								className="rounded-full h-10 w-10 md:h-12 md:w-12 ml-2 md:ml-4"
							>
								<PhoneOff className="h-5 w-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Leave meeting</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
