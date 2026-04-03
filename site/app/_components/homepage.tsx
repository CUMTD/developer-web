"use client";
import CopyTextButton from "@common/copy-text-button";
import LinkButton from "@common/link-button";
import RealTimeIcon from "@common/real-time-icon";
import { H1 } from "@common/typography/heading";
import Prose from "@common/typography/prose";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@ui/card";
import { Separator } from "@ui/separator";
import { ArrowRight, DownloadIcon, ExternalLink, FolderArchive, KeyRoundIcon, WorkflowIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
	return (
		<div className=" max-w-7xl mx-auto pt-4 flex ">
			<div className="prose dark:prose-invert  p-5 min-w-full! flex flex-col gap-5 ">
				<div className="grid grid-cols-1 grid-rows-1 gap-6 bg lg:grid-cols-3">
					<div className="col-span-2 my-auto ">
						<Prose>
							<H1 className="mt-0! mb-2 text-5xl leading-tight tracking-tight">
								Welcome to the wonderful world of transit data!
							</H1>

							<p>
								As part of our commitment to staying on the frontline of technology, MTD is proud to offer various ways
								for students, academics, developers and tinkerers to access our service data. On this page you'll find
								links to some of the various data feeds we offer.
							</p>
						</Prose>
					</div>

					<div className="bg-sidebar ml-6 aspect-square col-span-1 rounded-2xl overflow-hidden hidden lg:flex relative not-prose">
						<Image
							alt=""
							src="/seats.jpg"
							priority
							fetchPriority="high"
							fill
							sizes="(min-width: 1024px) 33vw, 100vw"
							className="object-cover"
						/>
					</div>
				</div>
				<Separator />
				<h2 className="mt-4" id="feeds">
					Public Data Feeds
				</h2>
				<div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 grid-rows-2 gap-5">
					<Card className="gap-0!">
						<CardHeader>
							<FolderArchive />
							<h2 className="m-0! flex flex-row gap-2">GTFS</h2>
							<CardDescription>General Transit Feed Specification</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Standard data format for representing static transit schedules. Data comes in a .zip file that contains
								multiple comma-delimited text files.
							</p>
						</CardContent>
						<CardFooter className="mt-auto flex flex-col items-start gap-3">
							<CopyTextButton text="https://mtd.dev/gtfs.zip" />
							<div className="flex flex-row gap-4 flex-wrap">
								<Link href={"/gtfs.zip"} target="_blank" rel="noopener noreferrer">
									<Button>
										<DownloadIcon /> Download GTFS Feed
									</Button>
								</Link>

								<Link href={"https://gtfs.org/documentation/overview/"} target="_blank" rel="noopener noreferrer">
									<Button variant={"ghost"}>
										GTFS Specification <ExternalLink />
									</Button>
								</Link>
							</div>
						</CardFooter>
					</Card>
					<Card className="gap-0!">
						<CardHeader>
							<RealTimeIcon width={20} className="m-0!" aria-hidden="true" focusable={false} />
							<h2 className="m-0!">GTFS-RT</h2>
							<CardDescription>General Transit Feed Specification-Realtime</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Standard data format for representing realtime service status, including vehicle locations, departure
								estimates and crowding. Data is transmitted via protobuf (binary).
							</p>
						</CardContent>
						<CardFooter className="mt-auto">
							<div className="flex flex-row gap-4 flex-wrap">
								<Link href={"https://gtfs-rt.mtd.org"} target="_blank" rel="noopener noreferrer">
									<Button>
										<DownloadIcon />
										View GTFS-RT Feed
									</Button>
								</Link>
								<Link
									href={"https://gtfs.org/documentation/realtime/reference/"}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button variant={"ghost"}>
										GTFS-RT Specification <ExternalLink />
									</Button>
								</Link>
							</div>
						</CardFooter>
					</Card>
					<Card className="gap-0! md:col-span-2">
						<CardHeader>
							<WorkflowIcon />
							<h2 className="m-0! flex flex-row gap-4">Developer API v3.0</h2>
							<CardDescription>HTTP-based REST endpoint</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								If GTFS doesn't cut it, we offer a classic REST API, now in version 3.0. Use simple HTTP GET requests to
								fetch data on MTD service. Requires sign-up and an API key. Beginner friendly.
							</p>
						</CardContent>
						<CardFooter className="mt-auto">
							<div className="flex flex-row gap-4">
								<LinkButton
									href="/account/keys"
									variant={"secondary"}
									className="bg-[#002f87] text-white in-[.terminal]:bg-[#1D7C33] in-[.terminal]:text-white"
								>
									Get an API Key <KeyRoundIcon />
								</LinkButton>
								<LinkButton href="/reference/introduction">
									API Reference <ArrowRight />
								</LinkButton>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
