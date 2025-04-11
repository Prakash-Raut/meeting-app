"use client";

import type React from "react";

import { Card, CardContent } from "@workspace/ui/components/card";
import { Mic, MicOff, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface UserFeedPlayerProps {
	stream: MediaStream;
	isLocal?: boolean;
	userName?: string;
}

export const UserFeedPlayer: React.FC<UserFeedPlayerProps> = ({
	stream,
	isLocal = true,
	userName = "You",
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isAudioEnabled, setIsAudioEnabled] = useState(true);
	const [isVideoEnabled, setIsVideoEnabled] = useState(true);

	useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;

			// Check initial state of tracks
			const audioTracks = stream.getAudioTracks();
			const videoTracks = stream.getVideoTracks();

			if (audioTracks.length > 0) {
				setIsAudioEnabled(audioTracks[0]?.enabled ?? false);
			}

			if (videoTracks.length > 0) {
				setIsVideoEnabled(videoTracks[0]?.enabled ?? false);
			}

			// Listen for track enabled/disabled events
			const trackListener = () => {
				if (audioTracks.length > 0) {
					setIsAudioEnabled(audioTracks[0]?.enabled ?? false);
				}
				if (videoTracks.length > 0) {
					setIsVideoEnabled(videoTracks[0]?.enabled ?? false);
				}
			};

			stream.addEventListener("change", trackListener);

			return () => {
				stream.removeEventListener("change", trackListener);
			};
		}
	}, [stream]);

	return (
		<Card className="overflow-hidden relative">
			<CardContent className="p-0 h-full flex items-center justify-center bg-gray-800">
				{isVideoEnabled ? (
					<video
						className="-scale-x-100 w-full h-full object-cover"
						ref={videoRef}
						muted={isLocal}
						autoPlay
						playsInline
					/>
				) : (
					<div className="flex items-center justify-center h-full w-full bg-gray-700">
						<div className="h-20 w-20 rounded-full bg-gray-600 flex items-center justify-center">
							<User className="h-12 w-12 text-gray-400" />
						</div>
					</div>
				)}

				{/* User info overlay */}
				<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between">
					<span className="text-sm font-medium truncate">{userName}</span>
					{!isAudioEnabled && <MicOff className="h-4 w-4 text-red-400" />}
					{isAudioEnabled && !isLocal && <Mic className="h-4 w-4" />}
				</div>
			</CardContent>
		</Card>
	);
};
