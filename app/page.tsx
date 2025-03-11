// import DownloadButton from "@/components/DownloadButton";
import Image from "next/image";
import { listBlobs } from "@/services/azure/music";
import DownloadButton from "@/components/DownloadButton";

export default async function Home() {
  const blobs = await listBlobs();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      hello world!

    <section>
      <h1 className="text-2xl">Music</h1>
      <ul>
        {blobs && blobs.map((blob) => (
          <li className="border-b border-gray-50/45" key={blob.name}>
           <p>{blob.name}</p>
        <DownloadButton blobName={blob.name} />
          </li>
        ))}
      </ul>
    </section>
      
    </main>
  );
}
