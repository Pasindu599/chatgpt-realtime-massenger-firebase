import Image from "next/image";
import { SunIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-white px-2 h-screen">
      <h1 className="text-5xl font-bold mb-20">Chat GPT</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            {/* sun icon  */}
            <SunIcon className="size-8 text-white" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-2">
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
            <p className="infoText">Explain Something to me</p>
          </div>
        </div>
      </div>
    </div>
  );
}
