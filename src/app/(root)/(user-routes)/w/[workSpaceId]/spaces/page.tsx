import DisplaySpaceCards from "@/components/spaces/display-space-cards";
import Filter from "@/components/spaces/filter";
import { NewSpaceButton } from "@/components/spaces/new-space-button";
import SearchBar from "@/components/spaces/search-bar";
import { Suspense } from "react";

export default function Page({ params }: { params: { workSpaceId: string } }) {
  //6707746e3b26d3d00c9b1de3
  return (
    <div className="mt-4">
      <div className="flex px-4 justify-between">
        <SearchBar />
        <Filter />
      </div>
      <div className="h-0.5 bg-zinc-400 my-2 rounded-full"></div>
      <div className="flex gap-4 mt-8 mb-2 items-center">
        <h1 className="text-xl font-semibold">Spaces</h1>
        <NewSpaceButton workSpaceId={params.workSpaceId} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplaySpaceCards workSpaceId={params.workSpaceId} />
      </Suspense>
    </div>
  );
}
