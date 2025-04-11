"use client";

import { ControlBox } from "@/components/control-box";
import { UserFeedPlayer } from "@/components/user-feed";
import { useRoomStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Room: React.FC = () => {
	const { id } = useParams();

	const { socket, user, stream, peers } = useRoomStore();

	useEffect(() => {
		if (user && socket) {
			socket.emit("join-room", { roomId: id, peerId: user.id });
		}
	}, [id, user, socket]);

	return (
		<section className="flex flex-col items-center justify-center w-full min-h-screen gap-5">
			<h2>My Feed</h2>
			<h3>Room : {id}</h3>
			<h3>Peer: {user?.id}</h3>
			{stream ? (
				<UserFeedPlayer stream={stream} />
			) : (
				<p>
					Loading media stream... Please check your camera and microphone
					permissions.
				</p>
			)}
			{stream && <UserFeedPlayer stream={stream} />}
			{stream && <ControlBox stream={stream} />}

			{/* <div className="divider">
				{Object.keys(peers).length > 0 && (
					<div className="mt-8 w-full text-center">
						<h2 className="mb-4 text-xl font-semibold">Other Feeds</h2>
						<div className="flex flex-wrap justify-center gap-4">
							{Object.entries(peers).map(([peerId, peerStream]) => (
								<div key={peerId} className="flex flex-col items-center">
									<UserFeedPlayer stream={peerStream} />
									<span className="text-sm text-gray-500 mt-2">{peerId}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div> */}
		</section>
	);
};

export default Room;
