"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import DonorCard from "./DonorCard";
import DonorsSkeleton from "./DonorsSkeleton";
import EmptyDonorsState from "./EmptyDonorsState";
import DonateSection from "./DonateSection";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TopDonatorsSection() {
  const [showAll, setShowAll] = useState(false);

  const { data, error, isLoading } = useSWR("/api/donors", fetcher, {
    refreshInterval: 3600000, // 1 hour
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 600000, // 10 minutes
    fallbackData: { donors: [], errors: {} },
  });

  // If there's a complete error, show the fallback DonateSection
  if (error) {
    console.error("Failed to load donors:", error);
    return <DonateSection />;
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="relative isolate px-6 py-28 lg:px-8">
        {/* Gradient background blob */}
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[50%] aspect-[3/1] w-full -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-gradientstart/60 to-gradientend/60 opacity-30"
            style={{
              clipPath:
                "polygon(45% 55%, 61% 46%, 69% 55%, 78% 66%, 61% 81%, 35% 82%, 20% 75%, 24% 49%)",
            }}
          ></div>
        </div>

        <div className="py-20">
          <h2 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
            Top Donors
          </h2>
          <h4 className="scroll-m-20 text-xl text-center font-semibold tracking-tight">
            Thank you for supporting SimpMusic!
          </h4>
        </div>

        <DonorsSkeleton />
      </section>
    );
  }

  // Empty state
  if (!data?.donors || data.donors.length === 0) {
    return (
      <section className="relative isolate px-6 py-28 lg:px-8">
        {/* Gradient background blob */}
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[50%] aspect-[3/1] w-full -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-gradientstart/60 to-gradientend/60 opacity-30"
            style={{
              clipPath:
                "polygon(45% 55%, 61% 46%, 69% 55%, 78% 66%, 61% 81%, 35% 82%, 20% 75%, 24% 49%)",
            }}
          ></div>
        </div>

        <div className="py-20">
          <h2 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
            Top Donors
          </h2>
        </div>

        <EmptyDonorsState />
      </section>
    );
  }

  // Success state - display donors
  // Determine which donors to show
  const displayLimit = data.displayed || 12; // Default limit from API
  const donorsToShow = showAll ? data.donors : data.donors.slice(0, displayLimit);
  const hasMore = data.total > displayLimit;

  return (
    <section className="relative isolate px-6 py-28 lg:px-8">
      {/* Gradient background blob */}
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[50%] aspect-[3/1] w-full -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-gradientstart/60 to-gradientend/60 opacity-30"
          style={{
            clipPath:
              "polygon(45% 55%, 61% 46%, 69% 55%, 78% 66%, 61% 81%, 35% 82%, 20% 75%, 24% 49%)",
          }}
        ></div>
      </div>

      <div className="py-20">
        <h2 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl pb-8 bg-clip-text text-transparent bg-gradient-to-r from-gradientstart/60 to-50% to-gradientend/60">
          Top Donors
        </h2>
        <h4 className="scroll-m-20 text-xl text-center font-semibold tracking-tight">
          Thank you for supporting SimpMusic!
        </h4>
      </div>

      {/* Display partial errors if any */}
      {data.errors && Object.keys(data.errors).length > 0 && (
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <p className="text-sm text-default-500">
            Some donation platforms could not be loaded. Showing available donors.
          </p>
        </div>
      )}

      {/* Donor cards grid */}
      <div className="mx-21 my-10 flex flex-wrap justify-center gap-8">
        {donorsToShow.map((donor, index) => (
          <DonorCard key={`${donor.platform}-${donor.name}-${index}`} donor={donor} index={index} />
        ))}
      </div>

      {/* Show All / Show Less button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            color="primary"
            variant="bordered"
            size="lg"
            onPress={() => setShowAll(!showAll)}
            className="font-semibold"
          >
            {showAll ? `Show Top ${displayLimit}` : `Show All ${data.total} Donors`}
          </Button>
        </div>
      )}
    </section>
  );
}
