import { redirect } from "next/navigation";

export default function GtfsDownload() {
	return redirect("https://developer.mtd.org/gtfs/google_transit.zip");
}
