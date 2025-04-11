"use client";

import type React from "react";

import { useRoomStore } from "@/lib/store";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { KeyRound, Users, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateRoom: React.FC = () => {
	const socket = useRoomStore((s) => s.socket);
	const user = useRoomStore((s) => s.user);
	const initialize = useRoomStore((s) => s.initialize);
	const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
	const [meetingId, setMeetingId] = useState("");
	const [audioDisabled, setAudioDisabled] = useState(false);
	const [videoDisabled, setVideoDisabled] = useState(false);

	const router = useRouter();

	useEffect(() => {
		initialize();
	}, [initialize]);

	const initRoom = () => {
		if (socket) {
			console.log("Creating a new room", socket);
			socket.emit("create-room");
		} else {
			console.error("Socket is null. Unable to emit 'create-room' event.");
		}
	};

	const joinRoom = () => {
		if (socket && meetingId) {
			console.log("Joining a room with ID:", meetingId);
			socket.emit("join-room", { roomId: meetingId, peerId: user?.id });
			router.push(`/room/${meetingId}`);
		} else {
			console.error(
				"Socket is null or meeting ID is empty. Unable to emit 'join-room' event.",
			);
		}
	};

	return (
		<>
			<div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
				<Button size="lg" className="flex-1 gap-2" onClick={initRoom}>
					<Video className="h-5 w-5" />
					New Meeting
				</Button>

				<Button
					variant="outline"
					size="lg"
					className="flex-1 gap-2"
					onClick={() => setIsJoinModalOpen(true)}
				>
					<Users className="h-5 w-5" />
					Join Meeting
				</Button>
			</div>

			<Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Join Meeting</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						<div className="space-y-2">
							<Label htmlFor="meeting-id">Meeting ID</Label>
							<div className="flex items-center gap-2 border rounded-md px-3 py-2">
								<KeyRound className="h-4 w-4 text-muted-foreground" />
								<Input
									id="meeting-id"
									className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									placeholder="Enter meeting ID"
									value={meetingId}
									onChange={(e) => setMeetingId(e.target.value)}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="audio"
									checked={audioDisabled}
									onCheckedChange={(checked) => setAudioDisabled(!!checked)}
								/>
								<Label htmlFor="audio">Don't connect to Audio</Label>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="video"
									checked={videoDisabled}
									onCheckedChange={(checked) => setVideoDisabled(!!checked)}
								/>
								<Label htmlFor="video">Turn off my video</Label>
							</div>
						</div>
					</div>

					<DialogFooter className="sm:justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsJoinModalOpen(false)}
						>
							Close
						</Button>
						<Button
							type="button"
							disabled={!meetingId.trim()}
							onClick={joinRoom}
						>
							Join
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateRoom;
