"use client";
import CopyTextButton from "@components/CopyString";
import { Button } from "@shared/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@shared/shadcn/card";
import { Separator } from "@shared/shadcn/separator";
import { ArrowRight, DownloadIcon, ExternalLink, FolderArchive, KeyRoundIcon, WorkflowIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Homepage() {
	return (
		<div className=" max-w-[80rem] mx-auto pt-4 flex ">
			<div className="prose dark:prose-invert  p-5 min-w-full! flex flex-col gap-5 ">
				{/* <h2 className="">Welcome to MTD Developer Resources!</h2>
				<p>
					Students, developers, and general tinkerers our invited to explore the world of transit data through MTD's
					public data feeds.
				</p> */}
				<div className="grid grid-cols-3 grid-rows-1 gap-6 bg">
					<div className="col-span-2 my-auto ">
						<h2 className="mt-0! mb-2 text-5xl leading-tight tracking-tight  ">
							Welcome to the wonderful world of transit data!
						</h2>

						<p>
							As part of our commitment to staying on the frontline of technology, MTD is proud to offer various ways
							for students, academics, developers and tinkerers to access our service data. On this page you'll find
							links to some of the various data feeds we offer. Be sure to check out user-submitted apps in the{" "}
							<Link href="/garage">App Garage.</Link>
						</p>
					</div>

					<div className="bg-sidebar p-5 ml-6 aspect-square col-span-1 rounded-2xl flex items-center justify-center">
						<Image alt="" src={"/isobus2.png"} priority width={300} height={200} />
					</div>
				</div>
				<Separator />
				<h2 className="mt-4">Available Data</h2>
				<div className="grid md:grid-cols-2 grid-cols-1 md:grid-rows-3 grid-rows-2 gap-5">
					<Card className="gap-0!">
						<CardHeader>
							<FolderArchive />
							<h2 className="m-0! flex flex-row gap-2">GTFS</h2>
							<CardDescription>General Transit Feed Specification</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="">
								Industry standard for representing static transit schedules as data. Essentially a virtual timetable.
								Data comes in a .zip file that contains multiple comma-delimited text files.
							</p>
						</CardContent>
						<CardFooter className="mt-auto flex flex-col items-start gap-3">
							<CopyTextButton text="https://mtd.dev/gtfs.zip" />

							<div className="flex flex-row gap-4">
								<Button>
									<DownloadIcon /> Download GTFS Feed
								</Button>
								<Button variant={"ghost"}>
									GTFS Specification <ExternalLink />
								</Button>
							</div>
						</CardFooter>
					</Card>
					<Card className="gap-0!">
						<CardHeader>
							<Image priority src="/realtime-icon-adaptive.svg" alt="" className="m-0!" width={20} height={20} />
							<h2 className="m-0!">GTFS-RT</h2>
							<CardDescription>General Transit Feed Specification-Realtime</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Industry standard for representing realtime service status, including vehicle locations, departure
								estimates and crowding. Data is transmitted via protobuf (binary).
							</p>
						</CardContent>
						<CardFooter className="mt-auto">
							<div className="flex flex-row gap-4">
								<Button>
									<DownloadIcon />
									Download GTFS-RT Feed
								</Button>
								<Button variant={"ghost"}>
									GTFS-RT Specification <ExternalLink />
								</Button>
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
								<Button variant={"secondary"} className="bg-blue-800 text-white">
									Get an API Key <KeyRoundIcon />
								</Button>
								<Button>
									API Reference <ArrowRight />
								</Button>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
